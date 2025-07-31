#!/usr/bin/env node
/*
 Simple calendar proxy to avoid CORS and client-side API-key restrictions.
 Usage: set environment variable GOOGLE_API_KEY (optional) and run:
   node server/calendar-proxy.js
 Then in dev, keep the proxy running and the frontend can call /api/calendar-events
*/
import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const CALENDAR_ID = process.env.CALENDAR_ID || '6gk8bbmgm01bk625432gb33tk0@group.calendar.google.com';
const API_KEY = process.env.GOOGLE_API_KEY || process.env.VITE_GOOGLE_API_KEY;

// Parse minimal ICS to events (same logic as client parser)
function parseICSEvents(icsText, timeMinIso, timeMaxIso) {
  const events = [];
  const blocks = icsText.split(/BEGIN:VEVENT/gi).slice(1);
  for (const block of blocks) {
    try {
      const dtStartMatch = block.match(/DTSTART(?:;[^:]*)?:(\d{8}(?:T\d{6}Z?)?)/i);
      const dtEndMatch = block.match(/DTEND(?:;[^:]*)?:(\d{8}(?:T\d{6}Z?)?)/i);
      const summaryMatch = block.match(/SUMMARY:(.*)/i);
      if (!dtStartMatch || !dtEndMatch) continue;
      const rawStart = dtStartMatch[1];
      const rawEnd = dtEndMatch[1];
      const start = parseICSTime(rawStart);
      const end = parseICSTime(rawEnd);
      if (new Date(end) < new Date(timeMinIso) || new Date(start) > new Date(timeMaxIso)) continue;
      events.push({ start: start.toISOString(), end: end.toISOString(), name: (summaryMatch && summaryMatch[1].trim()) || 'Unbekannt' });
    } catch (e) { continue; }
  }
  return events;
}

function parseICSTime(raw) {
  if (/^\d{8}$/.test(raw)) {
    const y = raw.slice(0,4), m = raw.slice(4,6), d = raw.slice(6,8);
    return new Date(`${y}-${m}-${d}T00:00:00`);
  }
  if (/T\d{6}Z?$/.test(raw)) {
    const y = raw.slice(0,4), m = raw.slice(4,6), d = raw.slice(6,8);
    const t = raw.slice(9); const hh = t.slice(0,2), mm = t.slice(2,4), ss = t.slice(4,6);
    const z = raw.endsWith('Z') ? 'Z' : '';
    return new Date(`${y}-${m}-${d}T${hh}:${mm}:${ss}${z}`);
  }
  return new Date(raw);
}

app.get('/api/calendar-events', async (req, res) => {
  const { timeMin, timeMax } = req.query;
  const timeMinIso = timeMin || new Date().toISOString();
  const timeMaxIso = timeMax || new Date(Date.now() + 90*24*60*60*1000).toISOString();

  try {
    if (API_KEY) {
      const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CALENDAR_ID)}/events?key=${API_KEY}&timeMin=${encodeURIComponent(timeMinIso)}&timeMax=${encodeURIComponent(timeMaxIso)}&singleEvents=true&orderBy=startTime`;
      const r = await fetch(url);
      if (r.ok) {
        const data = await r.json();
        const periods = data.items.map(e => ({ start: new Date(e.start.date || e.start.dateTime).toISOString(), end: new Date(e.end.date || e.end.dateTime).toISOString(), name: e.summary || 'Unbekannt' }));
        return res.json(periods);
      }
      // fallthrough to ICS
    }

    // Try public ICS feed
    const icsUrl = `https://calendar.google.com/calendar/ical/${encodeURIComponent(CALENDAR_ID)}/public/basic.ics`;
    const icsResp = await fetch(icsUrl);
    if (!icsResp.ok) return res.status(502).json({ error: 'Failed to fetch ICS' });
    const icsText = await icsResp.text();
    const periods = parseICSEvents(icsText, timeMinIso, timeMaxIso);
    return res.json(periods);
  } catch (err) {
    console.error('calendar-proxy error', err);
    return res.status(500).json({ error: 'internal_error' });
  }
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Calendar proxy listening on http://localhost:${PORT}`);
});

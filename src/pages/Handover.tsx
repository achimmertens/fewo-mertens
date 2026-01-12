import React from 'react';
import { Link } from 'react-router-dom';

export default function Handover() {
  return (
    <main className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">handover</h1>

      {(() => {
        const html = `
<div class="wp-block-group__inner-container is-layout-flow wp-block-group-is-layout-flow">
  <h2 class="wp-block-heading">Schlüsselübergabe</h2>

  <p>Sowohl der Haus- als auch der Wohnungsschlüssel befinden sich in unserem Schlüsseltresor.</p>

  <div class="wp-block-columns is-layout-flex wp-container-core-columns-is-layout-9d6595d7 wp-block-columns-is-layout-flex">
    <div class="wp-block-column is-layout-flow wp-block-column-is-layout-flow">
      <figure class="wp-block-image size-large"><a href="https://greensniper.wordpress.com/wp-content/uploads/2024/01/image-3.png" class="keychainify-checked"><img src="https://greensniper.wordpress.com/wp-content/uploads/2024/01/image-3.png?w=1024" alt="" class="wp-image-5835"/></a></figure>

      <p>Der Schlüsseltresor befindet sich links von der Eingangstür.</p>
    </div>

    <div class="wp-block-column is-layout-flow wp-block-column-is-layout-flow">
      <figure class="wp-block-image size-large"><a href="https://greensniper.wordpress.com/wp-content/uploads/2024/01/image-2.png" class="keychainify-checked"><img src="https://greensniper.wordpress.com/wp-content/uploads/2024/01/image-2.png?w=1024" alt="" class="wp-image-5834"/></a></figure>

      <p>Auf unserem Schlüsseltresor befindet sich der Name "Annette+Achim Mertens".</p>
    </div>
  </div>

  <p>Nachts bitte ein Handy oder eine andere Lichtquelle dabei haben, da dieser Bereich nicht beleuchtet ist.</p>

  <p>Nach Eingabe des Codes muss unten noch ein kleiner Knopf gedrückt werden.</p>

  <figure class="wp-block-image size-large"><a href="https://greensniper.wordpress.com/wp-content/uploads/2024/06/screenshot-2024-06-15-130108.jpg" class="keychainify-checked"><img src="https://greensniper.wordpress.com/wp-content/uploads/2024/06/screenshot-2024-06-15-130108.jpg?w=1024" alt="" class="wp-image-5843"/></a></figure>

  <p>Den Code für den Schlüsseltresor erhalten Sie mündlich.</p>

  <p>Bitte nach der Abreise den Schlüssel unbedingt wieder zurück in diesen Tresor legen, diesen verschließen und die Zahlenrädchen verstellen.</p>

  <h2 class="wp-block-heading">Überweisung:</h2>

  <p>Bitte überweisen Sie das Geld an:</p>

  <p>Kontoinhaber: Achim + Annette Mertens</p>

  <p>Verwendungszweck: Ferienwohnung Einruhr</p>

  <p>IBAN: DE15 1001 2345 0281 5663 01</p>

  <p>Trade Republic</p>
</div>
        `;

        return <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: html }} />;
      })()}

      <div className="mt-8">
        <Link to="/" className="text-sm text-sky-600 hover:underline">Zurück zur Startseite</Link>
      </div>
    </main>
  );
}

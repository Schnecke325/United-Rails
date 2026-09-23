/**
 * Die wenigen interaktiven Stellen der Seite.
 *
 * Alpine reicht dafür: das Aufklappmenü der Hauptnavigation und das mobile
 * Vollbildmenü. Alles andere rendert der Server. Es gibt bewusst kein
 * Framework und keinen Zustand im Browser, der über einen Seitenwechsel
 * hinaus bestehen müsste.
 */

import Alpine from 'alpinejs';

window.Alpine = Alpine;

Alpine.start();

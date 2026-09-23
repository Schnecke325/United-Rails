<?php

declare(strict_types=1);

namespace App\Enums;

/** Moderationsstatus. Nichts wird ohne Freigabe öffentlich. */
enum GalleryStatus: string
{
    case Pending = 'PENDING';
    case Approved = 'APPROVED';
    case Rejected = 'REJECTED';

    public function label(): string
    {
        return match ($this) {
            self::Pending => 'In Prüfung',
            self::Approved => 'Freigegeben',
            self::Rejected => 'Abgelehnt',
        };
    }

    /** Signalfarbe der Statusanzeige. */
    public function tone(): string
    {
        return match ($this) {
            self::Pending => 'caution',
            self::Approved => 'clear',
            self::Rejected => 'stop',
        };
    }
}

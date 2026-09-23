<?php

declare(strict_types=1);

namespace App\Enums;

/** Modloader eines Modpack-Releases. */
enum ModpackLoader: string
{
    case Forge = 'Forge';
    case NeoForge = 'NeoForge';
    case Fabric = 'Fabric';
    case Quilt = 'Quilt';
}

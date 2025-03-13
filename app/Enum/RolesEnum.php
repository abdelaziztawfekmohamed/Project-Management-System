<?php

namespace App\Enum;

enum RolesEnum: string
{
    case Admin = 'admin';
    case ProjectManager = 'project_manager';
    case TeamMember = 'team_member';

    public static function labels(): array
    {
        return [
            self::Admin->value => 'Admin',
            self::ProjectManager->value => 'project_manager',
            self::TeamMember->value => 'team_member',
        ];
    }

    public function label()
    {
        return match ($this) {
            self::Admin => 'Admin',
            self::ProjectManager => 'Project Manager',
            self::TeamMember => 'User',
        };
    }
}

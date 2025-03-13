<?php

namespace App\Models;

use App\Enum\TeamEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Team extends Model
{
    /** @use HasFactory<\Database\Factories\TeamFactory> */
    use HasFactory;

    protected $fillable = ['name', 'created_by', 'project_id', 'team_leader_id', 'category'];

    protected $casts = [
        'category' => TeamEnum::class,
    ];

    public function users(): HasMany
    {
        return $this->hasMany(User::class);
    }

    public function projects(): BelongsToMany
    {
        return $this->belongsToMany(Project::class);
    }
}

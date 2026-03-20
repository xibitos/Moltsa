import { NextResponse } from 'next/server';
import { scanAllSkills } from '@/lib/skill-parser';

export async function GET() {
  try {
    const skills = scanAllSkills();

    if (skills.length > 0) {
      return NextResponse.json({ skills });
    }
    throw new Error('No skills found');
  } catch {
    // Mock data fallback
    const mockSkills = [
      {
        id: 'social-radar', name: 'Social Radar', description: 'Monitor social media mentions and collaboration opportunities.',
        location: '/skills/social-radar', source: 'workspace', emoji: '🔭', fileCount: 3,
        fullContent: '', files: ['SKILL.md', 'prompts/scan.md', 'prompts/report.md'], agents: ['main'],
      },
      {
        id: 'advisory-board', name: 'Advisory Board', description: '7 AI advisors with unique personalities for strategic consulting.',
        location: '/skills/advisory-board', source: 'workspace', emoji: '🏛️', fileCount: 8,
        fullContent: '', files: ['SKILL.md', 'advisors/cfo.md', 'advisors/cmo.md', 'advisors/cto.md'], agents: ['main'],
      },
      {
        id: 'linkedin-writer', name: 'LinkedIn Writer', description: 'Draft LinkedIn posts based on trending tech news.',
        location: '/skills/linkedin-writer', source: 'workspace', emoji: '📊', fileCount: 2,
        fullContent: '', files: ['SKILL.md', 'prompts/draft.md'], agents: ['main', 'studio'],
      },
      {
        id: 'git-backup', name: 'Git Backup', description: 'Auto-commit and push workspace changes on a schedule.',
        location: '/skills/git-backup', source: 'system', emoji: '🔄', fileCount: 1,
        fullContent: '', files: ['SKILL.md'], agents: ['main'],
      },
    ];
    return NextResponse.json({ skills: mockSkills });
  }
}

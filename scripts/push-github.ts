import { execSync } from 'child_process';
import path from 'path';

const rootDir = path.resolve(__dirname, '..');

console.log('🚀 Starting SkillFranchise deployment to GitHub...\n');

try {
  process.chdir(rootDir);

  const currentBranch = execSync('git rev-parse --abbrev-ref HEAD', {
    encoding: 'utf-8',
  }).trim();
  console.log(`📍 Current branch: ${currentBranch}`);

  console.log('📦 Staging all changes...');
  execSync('git add -A', { stdio: 'inherit' });

  const status = execSync('git status --short', { encoding: 'utf-8' }).trim();
  if (!status) {
    console.log('✅ No changes to commit\n');
    process.exit(0);
  }

  const commitMsg = `chore: fix turbo.json configuration and complete SkillFranchise implementation

- Renamed 'pipeline' field to 'tasks' for Turborepo 2.9.4 compatibility
- Fixed turbo.json configuration to be properly recognized
- Complete monorepo setup with Frontend, Backend, and Smart Contracts
- All infrastructure, documentation, and CI/CD pipelines in place

Co-authored-by: v0[bot] <v0[bot]@users.noreply.github.com>`;

  console.log('💾 Creating commit...');
  execSync(`git commit -m "${commitMsg}"`, { stdio: 'inherit' });

  console.log('\n🔄 Pushing to GitHub...');
  execSync(`git push origin ${currentBranch}`, { stdio: 'inherit' });

  console.log('\n✅ Deployment complete!');
  console.log(
    `📊 Changes pushed to: https://github.com/Cadarn97/Builden-SkillFranchise-/tree/${currentBranch}\n`
  );

  process.exit(0);
} catch (error) {
  console.error('\n❌ Deployment failed:', error instanceof Error ? error.message : String(error));
  process.exit(1);
}

'use client';

import React, { useMemo, useState } from 'react';

type Skill = {
  id: string;
  name: string;
  level: number; // 1-5
};

function UserDashboard() {
  const [address, setAddress] = useState<string>('');
  const [skills, setSkills] = useState<Skill[]>([
    { id: 'solidity', name: 'Solidity', level: 3 },
    { id: 'react', name: 'React', level: 4 }
  ]);

  const isConnected = useMemo(() => address.trim().length > 0, [address]);

  return (
    <section style={{ display: 'grid', gap: 16 }}>
      <header>
        <h1 style={{ margin: 0 }}>SkillFranchise</h1>
        <p style={{ margin: '8px 0 0 0' }}>
          Decentralized upskilling & recruitment (implementation v1.2 scaffold).
        </p>
      </header>

      <div style={{ display: 'grid', gap: 8 }}>
        <label style={{ display: 'grid', gap: 6, maxWidth: 520 }}>
          <span>Wallet address (demo)</span>
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="0x…"
            style={{ padding: 10, border: '1px solid #ddd', borderRadius: 6 }}
          />
        </label>

        <div>
          Status:{
            ''
            }' '}
            <strong style={{ color: isConnected ? 'green' : 'crimson' }}>
            {isConnected ? 'Connected' : 'Not connected'}
          </strong>
        </div>
      </div>

      <div style={{ border: '1px solid #eee', borderRadius: 8, padding: 16 }}>
        <h2 style={{ marginTop: 0 }}>Your skills</h2>
        <ul style={{ margin: 0, paddingLeft: 18 }}>
          {skills.map((s) => (
            <li key={s.id}>
              {s.name} — level {s.level}
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() =>
            setSkills((prev) => [
              ...prev,
              {
 id: `skill-${prev.length + 1}`, name: `New Skill ${prev.length + 1}`, level: 1 }
            ])
          }
          style={{
            marginTop: 12,
            padding: '10px 12px',
            borderRadius: 6,
            border: '1px solid #ddd',
            cursor: 'pointer'
          }}
        >
          Add skill (demo)
        </button>
      </div>

      <p style={{ color: '#666', marginTop: 0 }}>
        TODO: Replace this scaffold with the full UserDashboard implementation from the implementation draft (v1.2).
      </p>
    </section>
  );
}

export default function Page() {
  return (
    <main style={{ maxWidth: 920, margin: '40px auto', padding: '0 16px' }}>
      <UserDashboard />
    </main>
  );
}

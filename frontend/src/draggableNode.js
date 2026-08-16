// draggableNode.js

import { BiExport, BiGitMerge, BiImport } from 'react-icons/bi';
import { MdBugReport, MdTextFields, MdTimer } from 'react-icons/md';
import { SiOpenai } from 'react-icons/si';
import { TbMathFunction } from 'react-icons/tb';
import { VscGitCompare } from 'react-icons/vsc';

export const DraggableNode = ({ type, label }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType }
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  const colorMap = {
    'customInput': {
      bg: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      shadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
    },
    'customOutput': {
      bg: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
      shadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
    },
    'text': {
      bg: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
      shadow: '0 4px 12px rgba(20, 184, 166, 0.3)'
    },
    'llm': {
      bg: 'linear-gradient(135deg, #a855f7 0%, #9333ea 100%)',
      shadow: '0 4px 12px rgba(168, 85, 247, 0.3)'
    },
    'number': {
      bg: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
      shadow: '0 4px 12px rgba(249, 115, 22, 0.3)'
    },
    'delay': {
      bg: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
      shadow: '0 4px 12px rgba(239, 68, 68, 0.3)'
    },
    'logger': {
      bg: 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)',
      shadow: '0 4px 12px rgba(107, 114, 128, 0.3)'
    },
    'condition': {
      bg: 'linear-gradient(135deg, #eab308 0%, #ca8a04 100%)',
      shadow: '0 4px 12px rgba(234, 179, 8, 0.3)'
    },
    'merge': {
      bg: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
      shadow: '0 4px 12px rgba(236, 72, 153, 0.3)'
    }
  };

  const style = colorMap[type] || colorMap['customInput'];

  const iconMap = {
    'customInput': <BiImport />,
    'customOutput': <BiExport />,
    'text': <MdTextFields />,
    'llm': <SiOpenai />,
    'number': <TbMathFunction />,
    'delay': <MdTimer />,
    'logger': <MdBugReport />,
    'condition': <VscGitCompare />,
    'merge': <BiGitMerge />
  };

  const icon = iconMap[type];

  return (
    <div
      className={type}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      style={{
        cursor: 'grab',
        minWidth: '100px',
        height: '70px',
        display: 'flex',
        alignItems: 'center',
        borderRadius: '12px',
        background: style.bg,
        justifyContent: 'center',
        flexDirection: 'column',
        boxShadow: style.shadow,
        transition: 'all 0.3s ease',
        border: '2px solid rgba(255, 255, 255, 0.2)',
        fontWeight: '600',
        fontSize: '14px'
      }}
      onMouseEnter={(e) => {
        e.target.style.transform = 'translateY(-2px)';
        e.target.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.2)';
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = 'translateY(0)';
        e.target.style.boxShadow = style.shadow;
      }}
      draggable
    >
      <div style={{ fontSize: '24px', marginBottom: '4px', color: '#fff' }}>
        {icon}
      </div>
      <span style={{ color: '#fff', fontSize: '13px' }}>{label}</span>
    </div>
  );
};

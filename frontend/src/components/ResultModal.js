// ResultModal.js

import { BiNetworkChart } from 'react-icons/bi';
import { FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { MdLink } from 'react-icons/md';

export const ResultModal = ({ isOpen, onClose, result }) => {
    if (!isOpen) return null;

    const isSuccess = result?.is_dag;

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000,
                animation: 'fadeIn 0.3s ease-in-out',
            }}
            onClick={onClose}
        >
            <div
                style={{
                    backgroundColor: 'white',
                    borderRadius: '16px',
                    padding: '32px',
                    maxWidth: '500px',
                    width: '90%',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                    animation: 'slideIn 0.3s ease-out',
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Icon */}
                <div
                    style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '50%',
                        backgroundColor: isSuccess ? '#d1fae5' : '#fee2e2',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 24px',
                        fontSize: '32px',
                        color: isSuccess ? '#10b981' : '#ef4444',
                    }}
                >
                    {isSuccess ? <FaCheckCircle /> : <FaExclamationTriangle />}
                </div>

                {/* Title */}
                <h2
                    style={{
                        fontSize: '24px',
                        fontWeight: '700',
                        color: '#111827',
                        textAlign: 'center',
                        marginBottom: '16px',
                    }}
                >
                    {isSuccess ? 'Pipeline Validated Successfully!' : 'Pipeline Validation Warning'}
                </h2>

                {/* Message */}
                <p
                    style={{
                        fontSize: '16px',
                        color: '#6b7280',
                        textAlign: 'center',
                        marginBottom: '24px',
                        lineHeight: '1.5',
                    }}
                >
                    {isSuccess
                        ? 'Your pipeline is a valid Directed Acyclic Graph and ready to use.'
                        : 'Your pipeline contains cycles and may not execute properly.'}
                </p>

                {/* Stats */}
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr 1fr',
                        gap: '16px',
                        marginBottom: '24px',
                    }}
                >
                    <div
                        style={{
                            backgroundColor: '#f9fafb',
                            padding: '16px',
                            borderRadius: '8px',
                            textAlign: 'center',
                        }}
                    >
                        <div
                            style={{
                                fontSize: '28px',
                                fontWeight: '700',
                                color: '#3b82f6',
                                marginBottom: '4px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                            }}
                        >
                            <BiNetworkChart style={{ fontSize: '24px' }} />
                            {result?.num_nodes || 0}
                        </div>
                        <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500' }}>
                            Nodes
                        </div>
                    </div>

                    <div
                        style={{
                            backgroundColor: '#f9fafb',
                            padding: '16px',
                            borderRadius: '8px',
                            textAlign: 'center',
                        }}
                    >
                        <div
                            style={{
                                fontSize: '28px',
                                fontWeight: '700',
                                color: '#8b5cf6',
                                marginBottom: '4px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                            }}
                        >
                            <MdLink style={{ fontSize: '24px' }} />
                            {result?.num_edges || 0}
                        </div>
                        <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500' }}>
                            Edges
                        </div>
                    </div>

                    <div
                        style={{
                            backgroundColor: '#f9fafb',
                            padding: '16px',
                            borderRadius: '8px',
                            textAlign: 'center',
                        }}
                    >
                        <div
                            style={{
                                fontSize: '28px',
                                fontWeight: '700',
                                color: isSuccess ? '#10b981' : '#ef4444',
                                marginBottom: '4px',
                            }}
                        >
                            {isSuccess ? <FaCheckCircle /> : <FaExclamationTriangle />}
                        </div>
                        <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500' }}>
                            Valid DAG
                        </div>
                    </div>
                </div>

                {/* Close Button */}
                <button
                    onClick={onClose}
                    style={{
                        width: '100%',
                        padding: '12px 24px',
                        fontSize: '16px',
                        fontWeight: '600',
                        color: 'white',
                        backgroundColor: isSuccess ? '#10b981' : '#3b82f6',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                    }}
                    onMouseOver={(e) => {
                        e.target.style.backgroundColor = isSuccess ? '#059669' : '#2563eb';
                        e.target.style.transform = 'translateY(-1px)';
                    }}
                    onMouseOut={(e) => {
                        e.target.style.backgroundColor = isSuccess ? '#10b981' : '#3b82f6';
                        e.target.style.transform = 'translateY(0)';
                    }}
                >
                    Got it!
                </button>
            </div>

            <style>
                {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateY(-20px) scale(0.95);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
        `}
            </style>
        </div>
    );
};

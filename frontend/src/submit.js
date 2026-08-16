// submit.js

import { useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FiSend } from 'react-icons/fi';
import { ResultModal } from './components/ResultModal';
import { useStore } from './store';

export const SubmitButton = () => {
    const nodes = useStore((state) => state.nodes);
    const edges = useStore((state) => state.edges);
    const [modalOpen, setModalOpen] = useState(false);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nodes, edges }),
            });

            if (!response.ok) {
                throw new Error('Failed to parse pipeline');
            }

            const data = await response.json();
            setResult(data);
            setModalOpen(true);
        } catch (error) {
            console.error('Error:', error);
            setResult({
                num_nodes: 0,
                num_edges: 0,
                is_dag: false,
                error: error.message
            });
            setModalOpen(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px'
            }}>
                <button
                    type="submit"
                    onClick={handleSubmit}
                    disabled={loading}
                    style={{
                        padding: '12px 32px',
                        fontSize: '16px',
                        fontWeight: '600',
                        color: 'white',
                        backgroundColor: loading ? '#9ca3af' : '#3b82f6',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                    }}
                    onMouseOver={(e) => !loading && (e.target.style.backgroundColor = '#2563eb')}
                    onMouseOut={(e) => !loading && (e.target.style.backgroundColor = '#3b82f6')}
                >
                    {loading ? (
                        <>
                            <AiOutlineLoading3Quarters style={{
                                width: '16px',
                                height: '16px',
                                animation: 'spin 0.6s linear infinite'
                            }} />
                            Processing...
                        </>
                    ) : (
                        <>
                            <FiSend style={{ fontSize: '16px' }} />
                            Submit Pipeline
                        </>
                    )}
                </button>
                <span style={{ fontSize: '12px', color: '#6b7280' }}>
                    Press Delete/Backspace to remove selected nodes
                </span>
            </div>

            <ResultModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                result={result}
            />

            <style>
                {`
                    @keyframes spin {
                        from { transform: rotate(0deg); }
                        to { transform: rotate(360deg); }
                    }
                `}
            </style>
        </>
    );
}

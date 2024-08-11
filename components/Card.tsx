import React from 'react';

interface CardProps {
    title: string;
    children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ title, children }) => {
    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-primary from-primary-500 to-primary-600 px-6 py-4">
                <h3 className="text-lg font-display font-bold text-white">{title}</h3>
            </div>
            <div className="p-6">{children}</div>
        </div>
    );
};
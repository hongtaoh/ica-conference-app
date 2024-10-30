import React, { useState } from 'react'
import PapersTab from '../components/PapersTab'
import AuthorsTab from './AuthorsTab';
import SessionsTab from './SessionsTab';  


const Tabs = () => {
    const [activeTab, setActiveTab] = useState('papers')

    return (
        <div>
            <div className = "tabs">
                <button onClick={() => setActiveTab('papers')}>Papers</button>
                <button onClick={() => setActiveTab('authors')}>Authors</button>
                <button onClick={() => setActiveTab('sessions')}>Sessions</button>
            </div>
            {activeTab === 'papers' && <PapersTab />}
            {activeTab === 'authors' && <AuthorsTab />}
            {activeTab === 'sessions' && <SessionsTab />}
        </div>
    );

};

export default Tabs;
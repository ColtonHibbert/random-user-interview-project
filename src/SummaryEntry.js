
function SummaryEntry(props) {
    
    const {
        user,
        userIndex,
        currentPage,
        setCurrentProfile
    } = props;

    return (
        <div className="summary-entry" onClick={() => setCurrentProfile({
            display: true,
            currentPage: currentPage,
            userIndex: userIndex
        })}>
            <div className="ph4px">Name:{user.name.first} {user.name.last}</div>
            <div className="ph4px">Email:{user.email}</div>
            <div className="ph4px">Country:{user.location.country}</div>
            <div className="ph4px">City:{user.location.city}</div>
        </div>
    );
}

export default SummaryEntry;
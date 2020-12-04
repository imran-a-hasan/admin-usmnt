import './App.css';
import { Button, Table } from 'react-bootstrap';
import { useEffect, useState } from 'react';

function App() {

  const [links, setLinks] = useState(null);

  useEffect(() => {
    fetch("https://f07ibfl0dg.execute-api.us-east-1.amazonaws.com/GetAllLinks")
    .then(res => res.json())
    .then(res => {
      setLinks(res);
    });
  }, [links]);

  const acceptLink = (id, playerName, matchId) => {
    fetch('https://f07ibfl0dg.execute-api.us-east-1.amazonaws.com/AcceptLink', {
      method: 'POST',
      body: JSON.stringify({
        id: id,
        playerName: playerName,
        matchId: matchId,
        token: 'yoyoyo'
      })
    });
    setLinks(null);
  };

  const rejectLink = id => {
    fetch('https://f07ibfl0dg.execute-api.us-east-1.amazonaws.com/RejectLink', {
      method: 'POST',
      body: JSON.stringify({
        id: id,
        token: 'yoyoyo'
      })
    });
    setLinks(null);
  };

  function showLinks() {
    const rows = [];
    links.forEach(linkObj => {
      rows.push(
        <tr>
          <td>{linkObj.playerName}</td>
          <td>{linkObj.homeTeamName}</td>
          <td>{linkObj.awayTeamName}</td>
          <td>{linkObj.title}</td>
          <td>{linkObj.url}</td>
          <td><Button onClick={() => acceptLink(linkObj.id, linkObj.playerName, linkObj.matchId)}>Accept</Button></td>
          <td><Button onClick={() => rejectLink(linkObj.id)}>Reject</Button></td>
      </tr>
    )
    });
    return (
      <Table className='results-table'>
        <thead>
            <tr>
                <th>Player</th>
                <th>Home team</th>
                <th>Away team</th>
                <th>Title</th>
                <th>Link</th>
                <th>Accept</th>
                <th>Reject</th>
            </tr>
        </thead>
        <tbody>
            {rows}
        </tbody>
    </Table>
    );
  }

  return (
    <div>
      {links && showLinks()}
    </div>    
  );
}

export default App;

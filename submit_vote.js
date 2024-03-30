module.exports = (req, res) => {
    // Retrieve the selected hobby from the form
    const selectedHobby = req.body.hobby;

    // Load or initialize the poll data
    const pollDataFile = 'poll_data.json';
    const pollData = require(`./${pollDataFile}`);

    // Update the vote count for the selected hobby
    pollData[selectedHobby] = (pollData[selectedHobby] || 0) + 1;

    // Save the updated poll data
    require('fs').writeFileSync(pollDataFile, JSON.stringify(pollData));

    // Calculate and return the poll results
    const totalVotes = Object.values(pollData).reduce((a, b) => a + b, 0);
    const resultsHtml = `<h2>Poll Results</h2>`;
    for (const hobby in pollData) {
        const percentage = ((pollData[hobby] / totalVotes) * 100).toFixed(2);
        resultsHtml += `<p>${hobby}: ${percentage}% (${pollData[hobby]} votes)</p>`;
    }
    res.status(200).json(resultsHtml);
};

let roomId;
let participants = [];
let argumentsList = [];
let votes = {};

function showCreateRoom() {
    document.getElementById('home').classList.add('hidden');
    document.getElementById('createRoom').classList.remove('hidden');
}

function showJoinRoom() {
    document.getElementById('home').classList.add('hidden');
    document.getElementById('joinRoom').classList.remove('hidden');
}

function createRoom() {
    const roomName = document.getElementById('roomName').value;
    roomId = generateRoomId();
    participants = [];
    argumentsList = [];
    votes = {};
    alert(`Room ${roomName} dibuat dengan ID: ${roomId}`);
    document.getElementById('createRoom').classList.add('hidden');
    document.getElementById('adminRoom').classList.remove('hidden');
}

function joinRoom() {
    const id = document.getElementById('roomId').value;
    const name = document.getElementById('participantName').value;
    if (id === roomId) {
        participants.push(name);
        alert(`${name} bergabung ke room ${roomId}`);
        document.getElementById('joinRoom').classList.add('hidden');
        document.getElementById('participantRoom').classList.remove('hidden');
        document.getElementById('participantsList').innerText = `Peserta: ${participants.join(', ')}`;
    } else {
        alert('Room ID tidak valid');
    }
}

function sendArgument() {
    const argument = document.getElementById('argument').value;
    const logicType = document.getElementById('logicType').value;
    argumentsList.push({ argument, logicType });
    votes[argument] = { agree: 0, disagree: 0 };
    alert(`Argumen dikirim: ${argument} (${logicType})`);
    document.getElementById('argument').value = '';
}

function vote(choice) {
    const currentArgument = argumentsList[argumentsList.length - 1];
    if (currentArgument) {
        votes[currentArgument.argument][choice]++;
        alert(`Suara ${choice} diterima untuk argumen: ${currentArgument.argument}`);
    } else {
        alert('Tidak ada argumen untuk voting saat ini');
    }
}

function showResults() {
    const currentArgument = argumentsList[argumentsList.length - 1];
    if (currentArgument) {
        const totalVotes = votes[currentArgument.argument].agree + votes[currentArgument.argument].disagree;
        const agreePercentage = (votes[currentArgument.argument].agree / totalVotes) * 100;
        const result = agreePercentage >= 50 ? '✅ Diterima' : '❌ Ditolak';
        document.getElementById('resultsDisplay').innerText = `Hasil: ${result} (${agreePercentage.toFixed(2)}% Setuju)`;
        document.getElementById('results').classList.remove('hidden');
    } else {
        alert('Tidak ada argumen untuk ditampilkan hasilnya');
    }
}

function generateRoomId() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
}

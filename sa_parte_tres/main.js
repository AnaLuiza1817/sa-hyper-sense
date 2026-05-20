let sensoresCadastrados = [];
let tabelaSensoresInstance = null;
let proximoIdSensor = 1;

document.addEventListener('DOMContentLoaded', function() {
    carregarSensoresDoStorage();
    
    if (sensoresCadastrados.length === 0) {
        carregarSensoresDemo();
    }
    
    if (document.getElementById('tabelaSensores')) {
        inicializarTabelaSensores();
        atualizarCardsEstatisticas();
    }
    
    const formCadastro = document.getElementById('formCadastroSensor');
    if (formCadastro) {
        formCadastro.addEventListener('submit', function(e) {
            e.preventDefault();
            cadastrarSensor();
        });
    }
    
    const filtroTipo = document.getElementById('filtroTipo');
    const filtroStatus = document.getElementById('filtroStatus');
    if (filtroTipo) filtroTipo.addEventListener('change', aplicarFiltros);
    if (filtroStatus) filtroStatus.addEventListener('change', aplicarFiltros);
});

function carregarSensoresDemo() {
    sensoresCadastrados = [
        {
            id: 1,
            nome: "Sensor Temperatura - Sala Servidores",
            tipo: "temperatura",
            localizacao: "Data Center, Sala 01",
            unidadeMedida: "°C",
            intervaloLeitura: "10",
            status: "ativo",
            valorMinimo: "18",
            valorMaximo: "28",
            descricao: "Monitoramento crítico de temperatura dos servidores",
            ultimaLeitura: "23.5°C - 2 min atrás",
            dataCadastro: new Date().toLocaleDateString()
        },
        {
            id: 2,
            nome: "Sensor Umidade - Estufa",
            tipo: "umidade",
            localizacao: "Estufa Principal, Prédio B",
            unidadeMedida: "%",
            intervaloLeitura: "5",
            status: "ativo",
            valorMinimo: "40",
            valorMaximo: "80",
            descricao: "Controle de umidade para plantas",
            ultimaLeitura: "65% - 1 min atrás",
            dataCadastro: new Date().toLocaleDateString()
        },
        {
            id: 3,
            nome: "Sensor Movimento - Entrada Principal",
            tipo: "movimento",
            localizacao: "Hall de Entrada",
            unidadeMedida: "",
            intervaloLeitura: "1",
            status: "manutencao",
            valorMinimo: "",
            valorMaximo: "",
            descricao: "Detecta presença na entrada principal",
            ultimaLeitura: "Última ativação: 15:30",
            dataCadastro: new Date().toLocaleDateString()
        },
        {
            id: 4,
            nome: "Sensor Qualidade do Ar - Cozinha",
            tipo: "qualidade-ar",
            localizacao: "Cozinha Industrial",
            unidadeMedida: "ppm",
            intervaloLeitura: "30",
            status: "ativo",
            valorMinimo: "0",
            valorMaximo: "1000",
            descricao: "Monitora CO2 e partículas",
            ultimaLeitura: "420 ppm - 5 min atrás",
            dataCadastro: new Date().toLocaleDateString()
        },
        {
            id: 5,
            nome: "Sensor Luminosidade - Sala de Reuniões",
            tipo: "luminosidade",
            localizacao: "Sala 302",
            unidadeMedida: "lux",
            intervaloLeitura: "60",
            status: "inativo",
            valorMinimo: "100",
            valorMaximo: "500",
            descricao: "Controle de iluminação automática",
            ultimaLeitura: "Offline",
            dataCadastro: new Date().toLocaleDateString()
        }
    ];
    proximoIdSensor = 6;
    salvarSensoresNoStorage();
}

function salvarSensoresNoStorage() {
    localStorage.setItem('sensores', JSON.stringify(sensoresCadastrados));
    localStorage.setItem('proximoIdSensor', proximoIdSensor);
}

function carregarSensoresDoStorage() {
    const stored = localStorage.getItem('sensores');
    if (stored) {
        sensoresCadastrados = JSON.parse(stored);
        const storedId = localStorage.getItem('proximoIdSensor');
        if (storedId) proximoIdSensor = parseInt(storedId);
    }
}

function cadastrarSensor() {
    const novoSensor = {
        id: proximoIdSensor++,
        nome: document.getElementById('nomeSensor').value,
        tipo: document.getElementById('tipoSensor').value,
        localizacao: document.getElementById('localizacao').value,
        unidadeMedida: document.getElementById('unidadeMedida').value,
        intervaloLeitura: document.getElementById('intervaloLeitura').value,
        status: document.getElementById('statusSensor').value,
        valorMinimo: document.getElementById('valorMinimo').value,
        valorMaximo: document.getElementById('valorMaximo').value,
        descricao: document.getElementById('descricao').value,
        ultimaLeitura: "Aguardando primeira leitura...",
        dataCadastro: new Date().toLocaleDateString()
    };
    
    sensoresCadastrados.push(novoSensor);
    salvarSensoresNoStorage();
    
    alert(`Sensor "${novoSensor.nome}" cadastrado com sucesso
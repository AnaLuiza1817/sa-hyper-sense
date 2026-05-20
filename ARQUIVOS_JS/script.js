function showAlert() {
    alert("🔔 Funcionalidade em desenvolvimento. Esta é uma demonstração do sistema.");
}

document.addEventListener('DOMContentLoaded', function() {
    
    const tabelaUsuarios = document.getElementById('tabelaUsuarios');
    if (tabelaUsuarios) {
        carregarUsuarios();
    }
    
    atualizarEstatisticasHome();
});

const usuariosMock = [
    { id: 1, nome: "Ana Maria Silva", email: "ana.silva@email.com", telefone: "(11) 98765-4321", tipo: "Administrador", status: "Ativo" },
    { id: 2, nome: "Carlos Eduardo Santos", email: "carlos.santos@email.com", telefone: "(21) 97654-3210", tipo: "Gerente", status: "Ativo" },
    { id: 3, nome: "Fernanda Oliveira", email: "fernanda.oliveira@email.com", telefone: "(31) 96543-2109", tipo: "Usuário", status: "Inativo" },
    { id: 4, nome: "Roberto Almeida", email: "roberto.almeida@email.com", telefone: "(41) 95432-1098", tipo: "Usuário", status: "Ativo" },
    { id: 5, nome: "Juliana Costa", email: "juliana.costa@email.com", telefone: "(51) 94321-0987", tipo: "Visualizador", status: "Ativo" },
    { id: 6, nome: "Marcos Vinicius", email: "marcos.vini@email.com", telefone: "(61) 93210-9876", tipo: "Administrador", status: "Ativo" },
    { id: 7, nome: "Patrícia Lima", email: "patricia.lima@email.com", telefone: "(71) 92109-8765", tipo: "Gerente", status: "Inativo" },
    { id: 8, nome: "Ricardo Nogueira", email: "ricardo.nog@email.com", telefone: "(81) 91098-7654", tipo: "Usuário", status: "Ativo" }
];

function carregarUsuarios() {
    const tbody = document.querySelector('#tabelaUsuarios tbody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    usuariosMock.forEach(usuario => {
        const statusBadge = usuario.status === 'Ativo' 
            ? '<span class="badge bg-success rounded-pill"> Ativo</span>' 
            : '<span class="badge bg-secondary rounded-pill"> Inativo</span>';
        
        const row = `
            <tr>
                <td>${usuario.id}</td>
                <td><strong>${usuario.nome}</strong></td>
                <td><i class="fas fa-envelope me-1 text-muted"></i> ${usuario.email}</td>
                <td><i class="fas fa-phone me-1 text-muted"></i> ${usuario.telefone}</td>
                <td><span class="badge bg-info text-dark rounded-pill">${usuario.tipo}</span></td>
                <td>${statusBadge}</td>
                <td>
                    <button class="btn btn-sm btn-outline-primary me-1" onclick="editarUsuario(${usuario.id})" title="Editar">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger" onclick="excluirUsuario(${usuario.id})" title="Excluir">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </td>
            </tr>
        `;
        tbody.insertAdjacentHTML('beforeend', row);
    });
    
    const totalSpan = document.getElementById('totalUsuariosSpan');
    if (totalSpan) {
        totalSpan.textContent = usuariosMock.length;
    }
    
    if (typeof $.fn.DataTable !== 'undefined') {
        if ($.fn.DataTable.isDataTable('#tabelaUsuarios')) {
            $('#tabelaUsuarios').DataTable().destroy();
        }
        
        $('#tabelaUsuarios').DataTable({
            language: {
                url: '//cdn.datatables.net/plug-ins/1.13.4/i18n/pt-BR.json'
            },
            pageLength: 5,
            responsive: true,
            columnDefs: [
                { orderable: true, targets: [0, 1, 2, 3, 4] },
                { orderable: false, targets: [5, 6] }
            ]
        });
    }
}

function editarUsuario(id) {
    const usuario = usuariosMock.find(u => u.id === id);
    if (usuario) {
        alert(`✏️ Editar usuário: ${usuario.nome}\nFuncionalidade em desenvolvimento.`);
    } else {
        alert("Usuário não encontrado.");
    }
}

// Função para excluir usuário (simulação)
function excluirUsuario(id) {
    if (confirm("⚠️ Tem certeza que deseja excluir este usuário?")) {
        const index = usuariosMock.findIndex(u => u.id === id);
        if (index !== -1) {
            usuariosMock.splice(index, 1);
            alert("Usuário removido com sucesso!");
            carregarUsuarios(); // Recarrega a tabela
        }
    }
}
function atualizarEstatisticasHome() {
    console.log("Estatísticas da HOME carregadas. Total de usuários mock:", usuariosMock.length);
}

function buscaRapida() {
    const termo = prompt("Digite o nome ou e-mail do usuário para buscar:");
    if (termo && termo.trim() !== "") {
        const tabela = $('#tabelaUsuarios').DataTable();
        tabela.search(termo).draw();
    }
}
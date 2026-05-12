const usuariosCadastrados = [
    {
        id: 1,
        nome: "Ana Beatriz Costa",
        email: "ana.costa@hypersense.com",
        telefone: "(11) 98765-4321",
        tipo: "Administrador",
        status: "Ativo",
        ultimoAcesso: "2025-03-15"
    },
    {
        id: 2,
        nome: "Carlos Eduardo Silva",
        email: "carlos.silva@hypersense.com",
        telefone: "(21) 99876-5432",
        tipo: "Gerente",
        status: "Ativo",
        ultimoAcesso: "2025-03-14"
    },
    {
        id: 3,
        nome: "Fernanda Lima",
        email: "fernanda.lima@hypersense.com",
        telefone: "(31) 98745-6789",
        tipo: "Usuário Comum",
        status: "Ativo",
        ultimoAcesso: "2025-03-15"
    },
    {
        id: 4,
        nome: "Roberto Alves",
        email: "roberto.alves@hypersense.com",
        telefone: "(41) 99988-7766",
        tipo: "Usuário Comum",
        status: "Inativo",
        ultimoAcesso: "2025-02-28"
    },
    {
        id: 5,
        nome: "Juliana Menezes",
        email: "juliana.m@hypersense.com",
        telefone: "(51) 99844-3322",
        tipo: "Administrador",
        status: "Ativo",
        ultimoAcesso: "2025-03-15"
    },
    {
        id: 6,
        nome: "Thiago Nascimento",
        email: "thiago.n@hypersense.com",
        telefone: "(61) 99777-8899",
        tipo: "Gerente",
        status: "Ativo",
        ultimoAcesso: "2025-03-13"
    },
    {
        id: 7,
        nome: "Patrícia Oliveira",
        email: "patricia.oliveira@hypersense.com",
        telefone: "(71) 99666-5544",
        tipo: "Usuário Comum",
        status: "Ativo",
        ultimoAcesso: "2025-03-12"
    },
    {
        id: 8,
        nome: "Lucas Mendes",
        email: "lucas.mendes@hypersense.com",
        telefone: "(85) 99555-4433",
        tipo: "Usuário Comum",
        status: "Ativo",
        ultimoAcesso: "2025-03-11"
    }
];

async function loadPage(page) {
    const contentDiv = document.getElementById('page-content');
    
    try {
        let html = '';
        
        if (page === 'home') {
            const response = await fetch('home.html');
            html = await response.text();
            contentDiv.innerHTML = html;
            atualizarEstatisticasHome();
        } else if (page === 'usuarios') {
            const response = await fetch('usuarios.html');
            html = await response.text();
            contentDiv.innerHTML = html;
            renderizarTabelaUsuarios();
        } else {
            contentDiv.innerHTML = `
                <div class="text-center p-5">
                    <i class="bi bi-construction" style="font-size: 4rem; color: var(--secondary);"></i>
                    <h3 class="mt-3">Página em desenvolvimento</h3>
                    <p>Esta funcionalidade estará disponível em breve.</p>
                </div>
            `;
        }
        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-page') === page) {
                link.classList.add('active');
            }
        });
        
    } catch (error) {
        console.error('Erro ao carregar página:', error);
        contentDiv.innerHTML = `
            <div class="alert alert-danger">
                <i class="bi bi-exclamation-triangle"></i> Erro ao carregar a página. Verifique se os arquivos home.html e usuarios.html existem.
            </div>
        `;
    }
}

function atualizarEstatisticasHome() {
    const totalUsuarios = usuariosCadastrados.length;
    const ativosHoje = usuariosCadastrados.filter(u => u.status === 'Ativo' && u.ultimoAcesso === '2025-03-15').length;
    const novosMes = 12;
    const satisfacao = 94;
    
    const totalElement = document.getElementById('total-usuarios');
    const ativosElement = document.getElementById('ativos-hoje');
    const novosElement = document.getElementById('novos-mes');
    const satisfacaoElement = document.getElementById('satisfacao');
    
    if (totalElement) totalElement.textContent = totalUsuarios;
    if (ativosElement) ativosElement.textContent = ativosHoje || 5;
    if (novosElement) novosElement.textContent = novosMes;
    if (satisfacaoElement) satisfacaoElement.textContent = `${satisfacao}%`;
}

function renderizarTabelaUsuarios() {
    const tbody = document.getElementById('usuarios-table-body');
    const totalRegistros = document.getElementById('total-registros');
    
    if (!tbody) return;
    
    const getBadgeClass = (tipo) => {
        switch(tipo) {
            case 'Administrador': return 'badge-admin';
            case 'Gerente': return 'badge-gerente';
            default: return 'badge-comum';
        }
    };
    
    const rows = usuariosCadastrados.map(user => `
        <tr>
            <td><strong>${user.nome}</strong></td>
            <td>${user.email}</td>
            <td>${user.telefone}</td>
            <td><span class="badge-user ${getBadgeClass(user.tipo)}">${user.tipo}</span></td>
            <td>
                <span class="badge-user" style="background: ${user.status === 'Ativo' ? '#2ecc71' : '#95a5a6'}; color: white;">
                    ${user.status}
                </span>
            </td>
            <td>${new Date(user.ultimoAcesso).toLocaleDateString('pt-BR')}</td>
            <td>
                <button class="btn btn-sm btn-outline-info" onclick="window.editarUsuario(${user.id})" title="Editar">
                    <i class="bi bi-pencil"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger" onclick="window.excluirUsuario(${user.id})" title="Excluir">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
    
    tbody.innerHTML = rows;
    
    if (totalRegistros) {
        totalRegistros.innerHTML = `<i class="bi bi-info-circle"></i> Total de registros: ${usuariosCadastrados.length} usuários cadastrados no sistema.`;
    }
}

window.navigateToUsuarios = function() {
    loadPage('usuarios');
};

window.showNotification = function() {
    alert('Funcionalidade em desenvolvimento! Em breve mais recursos no Hyper Sense.');
};

window.abrirNovoUsuario = function() {
    alert('Formulário de novo usuário será aberto aqui.\nFuncionalidade em desenvolvimento.');
};

window.editarUsuario = function(id) {
    const usuario = usuariosCadastrados.find(u => u.id === id);
    if (usuario) {
        alert(`Editar usuário: ${usuario.nome}\nFuncionalidade em desenvolvimento.`);
    }
};

window.excluirUsuario = function(id) {
    const usuario = usuariosCadastrados.find(u => u.id === id);
    if (usuario && confirm(`Deseja excluir o usuário "${usuario.nome}"?`)) {
        alert(`Usuário ${usuario.nome} seria excluído (demonstração).`);
    }
};

function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link[data-page]');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.getAttribute('data-page');
            loadPage(page);
        });
    });

    const logo = document.querySelector('.navbar-brand');
    if (logo) {
        logo.addEventListener('click', (e) => {
            e.preventDefault();
            loadPage('home');
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setupNavigation();
    loadPage('home'); 
    console.log('✅ Hyper Sense system ready — CSS, JS and HTML separated');
});
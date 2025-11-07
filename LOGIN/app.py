from flask import Flask, render_template, request, redirect, url_for
import mysql.connector

app = Flask(__name__)

# =========================
# CONEXÃO COM O BANCO
# =========================
def conectar():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="",
        database="produtos"
    )

# =========================
# PÁGINA DE LOGIN
# =========================
@app.route('/')
def index():
    return render_template('index.html')  # Página de login

# =========================
# ROTA DE LOGIN
# =========================
@app.route('/login', methods=['POST'])
def login():
    nome = request.form['nome']
    email = request.form['email']
    senha = request.form['senha']

    # Aqui pode fazer verificação com banco, se quiser
    # Exemplo simples (login fixo)
    if nome == "admin" and senha == "123":
        return redirect(url_for('produtos'))
    else:
        return "<h3>Usuário ou senha incorretos.</h3><a href='/'>Voltar</a>"

# =========================
# PÁGINA DE LISTA DE PRODUTOS
# =========================
@app.route('/produtos')
def produtos():
    con = conectar()
    cur = con.cursor()
    cur.execute("SELECT * FROM produtos")
    produtos = cur.fetchall()
    con.close()
    return render_template('produtos.html', produtos=produtos)

# =========================
# PÁGINA DE CADASTRO
# =========================
@app.route('/cadastrar')
def cadastrar():
    return render_template('cadastrar.html')

# =========================
# SALVAR NOVO PRODUTO
# =========================
@app.route('/salvar', methods=['POST'])
def salvar():
    nome = request.form['nome']
    preco = request.form['preco']
    quantidade = request.form['quantidade']

    con = conectar()
    cur = con.cursor()
    cur.execute("INSERT INTO produtos (nome, preco, quantidade) VALUES (%s, %s, %s)", (nome, preco, quantidade))
    con.commit()
    con.close()

    return redirect(url_for('produtos'))

# =========================
# EXECUTAR APLICAÇÃO
# =========================
if __name__ == '__main__':
    app.run(debug=True)

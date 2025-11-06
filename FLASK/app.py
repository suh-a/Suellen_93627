from flask import Flask, render_template, jsonify
app = Flask(__name__)
# Página principal
@app.route('/')
def home():return render_template('index.html')

@app.route('/projetos')
def projetos():
    return render_template('projetos.html')

# API simples
@app.route('/api/mensagem')
def mensagem():return jsonify({'mensagem': 'Olá, mundo!'})


# Iniciar o site
if __name__ == '__main__':app.run(debug=True)
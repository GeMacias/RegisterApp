from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

profesores = [
    {
        "id": 1,
        "nombre": "Jose Riquelme",
        "cursos": [
            {
                "id": 1,
                "nombre": "Programación movil",
                "codigo": "PGY4121",
                "seccion": "004D",
                "alumnos": [
                    {"id": 1, "nombre": "Alonso"},
                    {"id": 2, "nombre": "German"}
                ]
            }
        ]
    }
]


usuarios = [
    {
        "id": 1,
        "user": "jo.riquelme",
        "password": "jose123",
        "nombre": "Jose Riquelme",
        "perfil":  1,
        "correo": "jo.riquelme@gmail.com"
    },
    {
        "id": 2,
        "user": "alo.barrera",
        "password": "alonso123",
        "nombre": "Alonso Barrera",
        "perfil": 2,
        "correo": "alobarrera@gmail.com"
    },
    {
        "id": 3,
        "user": "ge.macias",
        "password": "hola1234",
        "nombre": "German Macías",
        "perfil": 2,
        "correo": "gemacias@gmail.com"
    }
]


@app.route('/login', methods=['POST'])
def login():
    username = request.json.get('user')
    password = request.json.get('password')
    
    usuario = next((u for u in usuarios if u["user"] == username and u["password"] == password), None)
    
    if usuario:
        return jsonify({
            "id": usuario["id"],
            "nombre": usuario["nombre"],
            "user": usuario["user"],
            "correo": usuario["correo"],
            "tipoPerfil": usuario["perfil"]
        }), 200
    else:
        return jsonify({"message": "Credenciales incorrectas"}), 401


@app.route('/profesores', methods=['GET'])
def obtener_profesores():
    return jsonify(profesores), 200

@app.route('/profesores/<int:profesor_id>/cursos', methods=['GET'])
def obtener_cursos_profesor(profesor_id):
    profesor = next((p for p in profesores if p["id"] == profesor_id), None)
    if not profesor:
        return jsonify({"message": "Profesor no encontrado"}), 404
    return jsonify(profesor["cursos"]), 200

@app.route('/profesores/<int:profesor_id>/cursos/<int:curso_id>/alumnos', methods=['GET'])
def obtener_alumnos_curso(profesor_id, curso_id):
    profesor = next((p for p in profesores if p["id"] == profesor_id), None)
    if not profesor:
        return jsonify({"message": "Profesor no encontrado"}), 404
    curso = next((c for c in profesor["cursos"] if c["id"] == curso_id), None)
    if not curso:
        return jsonify({"message": "Curso no encontrado"}), 404
    return jsonify(curso["alumnos"]), 200

if __name__ == '__main__':
    app.run(debug=True)

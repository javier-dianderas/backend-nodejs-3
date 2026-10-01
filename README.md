# ShipNow API

API REST de ShipNow desarrollada con Node.js, Express y MongoDB.

El proyecto implementa una arquitectura de 3 capas (**Controller - Service - Repository**) para separar las responsabilidades de la aplicación y facilitar su mantenimiento y escalabilidad.

## Requisitos

- Node.js 18+
- MongoDB local o una instancia de MongoDB accesible
- npm

## Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/javier-dianderas/backend-nodejs-3.git
```

2. Ingresar al directorio del proyecto:

```bash
cd shipnow
```

3. Instalar las dependencias:

```bash
npm install
```

4. Crear un archivo `.env` en la raíz del proyecto tomando como referencia `.env.example`.

Ejemplo:

```env
NODE_ENV=development
PORT=8080
MONGODB_URI=mongodb://localhost:27017/example
JWT_SECRET=example_jwt_secret
SHIPPING_API_KEY=example_shipping_api_key
```

Los valores utilizados en `.env.example` son únicamente valores de ejemplo y no corresponden a credenciales reales.

El archivo `.env` contiene la configuración local y posibles datos sensibles, por lo que no debe subirse al repositorio.

5. Iniciar la aplicación en modo desarrollo:

```bash
npm run dev
```

La aplicación valida las variables de entorno requeridas durante el arranque. Si falta alguna variable crítica, muestra un error descriptivo y no se inicia.

## Arquitectura

El proyecto utiliza una arquitectura de tres capas:

```text
Router
   ↓
Controller
   ↓
Service
   ↓
Repository
   ↓
Model / MongoDB
```

### Controller

Es la capa encargada de gestionar las solicitudes y respuestas HTTP.

Recibe los datos provenientes de `req`, llama al Service correspondiente y devuelve la respuesta con el código HTTP adecuado.

El Controller no accede directamente a Mongoose ni a MongoDB.

### Service

Contiene la lógica de negocio de la aplicación.

Esta capa realiza validaciones y aplica las reglas necesarias antes de consultar o modificar información mediante el Repository.

Por ejemplo, la lógica relacionada con el cálculo del costo de envío de un producto pertenece al Service, ya que representa una regla de negocio y no una operación de acceso a datos.

### Repository

Es la única capa que conoce los detalles de persistencia y acceso a MongoDB mediante Mongoose.

El Repository se encarga de realizar las consultas, aplicar filtros y proyecciones, crear registros y actualizar o eliminar información.

Esta separación permite que la lógica de negocio permanezca independiente de la tecnología utilizada para almacenar los datos.

## ¿Por qué separar Service y Repository?

Se separaron estas responsabilidades para evitar mezclar la lógica de negocio con el acceso a la base de datos.

El **Repository** se ocupa exclusivamente de cómo se obtienen y persisten los datos utilizando Mongoose, mientras que el **Service** determina qué operaciones deben realizarse de acuerdo con las reglas del negocio.

De esta manera, si en el futuro cambia la forma de almacenamiento de datos, la lógica de negocio puede mantenerse sin depender directamente de Mongoose o MongoDB.

Además, esta separación facilita las pruebas, el mantenimiento y la escalabilidad de la aplicación.

## Configuración de entorno

Las variables de entorno se administran de forma centralizada mediante `src/config/env.config.js`.

La aplicación valida al iniciar que estén definidas las siguientes variables requeridas:

- `MONGODB_URI`
- `JWT_SECRET`
- `SHIPPING_API_KEY`

El resto de la aplicación utiliza el objeto de configuración exportado por este módulo, evitando acceder directamente a `process.env`.

El repositorio incluye un archivo `.env.example` con las variables necesarias y valores ficticios, sin exponer las credenciales reales utilizadas por la aplicación.

## Constantes

Los valores inmutables del dominio, como los roles de usuario y los estados de productos, se encuentran centralizados en `src/constants/index.js`.

Esto evita utilizar strings directamente en diferentes partes de la aplicación y permite mantener estos valores en un único lugar.

## Endpoints

| Método | Ruta                              | Descripción                                                          |
| ------ | --------------------------------- | -------------------------------------------------------------------- |
| GET    | `/api/health`                     | Health check                                                         |
| GET    | `/api/users`                      | Listar usuarios                                                      |
| POST   | `/api/users`                      | Crear usuario                                                        |
| GET    | `/api/users/:id`                  | Obtener usuario                                                      |
| PUT    | `/api/users/:id`                  | Actualizar usuario                                                   |
| DELETE | `/api/users/:id`                  | Eliminar usuario                                                     |
| GET    | `/api/products`                   | Listar productos con stock (`?all=true` incluye productos sin stock) |
| POST   | `/api/products`                   | Crear producto                                                       |
| GET    | `/api/products/:id`               | Obtener producto                                                     |
| PUT    | `/api/products/:id`               | Actualizar producto                                                  |
| DELETE | `/api/products/:id`               | Eliminar producto                                                    |
| GET    | `/api/products/:id/shipping-cost` | Cotizar el envío de un producto                                      |

## Scripts

| Comando       | Uso                                                   |
| ------------- | ----------------------------------------------------- |
| `npm run dev` | Ejecutar la aplicación en modo desarrollo con nodemon |
| `npm start`   | Ejecutar la aplicación                                |

## Tecnologías utilizadas

- Node.js
- Express
- MongoDB
- Mongoose
- dotenv
- nodemon

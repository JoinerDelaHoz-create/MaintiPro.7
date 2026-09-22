# 🏭 CMMS Industrial v2.5 - Sistema de Gestión de Mantenimiento & Telemetría IoT

[![Python](https://img.shields.io/badge/Python-3.9%2B-blue.svg)](https://www.python.org/)
[![Database](https://img.shields.io/badge/Database-SQLite%20%7C%20JSONBin%20Cloud-003B57.svg)](https://jsonbin.io/)
[![Deploy](https://img.shields.io/badge/Deploy-Vercel%20Serverless-black.svg)](https://vercel.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

Sistema integral de gestión de mantenimiento asistido por computadora (**CMMS**) de grado industrial. Diseñado para operar tanto en red local como en la nube (**Vercel**), con **persistencia multi-dispositivo en tiempo real**, administración de activos, órdenes de trabajo (OT), telemetría IoT con mantenimiento predictivo, cálculo de indicadores de confiabilidad (**MTBF, MTTR, Disponibilidad**), control de acceso por roles (**RBAC**) y portal táctil optimizado para técnicos de campo en dispositivos móviles.

---

## 🌟 Características Implementadas

### 1. ☁️ Persistencia en la Nube Multi-Dispositivo (JSONBin.io)
* **Sincronización Total en Tiempo Real:** Los datos se sincronizan automáticamente entre diferentes dispositivos físicos (teléfonos de técnicos en planta y computadores de oficina del administrador).
* **Motor Híbrido (`storage.js`):** Utiliza una base de datos centralizada en la nube con fallback instantáneo a `localStorage` para funcionamiento sin conexión o desarrollo local.
* **Canal de Transmisión Multi-Pestaña (`BroadcastChannel`):** Cambios realizados en una pestaña se reflejan de inmediato en todas las demás pestañas abiertas sin recargar la página.
* **Actualización Automática Periódica:** Las interfaces de administrador y técnico ejecutan un refresco en segundo plano cada 10 segundos para incorporar nuevas OTs o cierres realizados por otros usuarios.

### 2. 👑 Panel de Control del Administrador
* **Gestión de Activos (CRUD):** Registro, monitoreo de horas acumuladas y control de estados operativos (`OPERATIONAL`, `MAINTENANCE`, `WARNING`, `DOWN`).
* **Órdenes de Trabajo (OT):** Creación, asignación, seguimiento de estado (`PENDING`, `IN_PROGRESS`, `COMPLETED`, `CANCELLED`) y cierre de órdenes preventivas, correctivas y predictivas.
* **Ficha de Confiabilidad por Activo:** Visualización detallada por equipo con cálculo automático de:
  * **Disponibilidad Operativa (%)**
  * **MTBF (Tiempo Medio Entre Fallas)**
  * **MTTR (Tiempo Medio de Reparación)**
  * **Fallas Correctivas y Tiempo de Paro Acumulado**
  * **Costos Totales de Mantenimiento**
* **Generación de Reportes CSV:** Exportación con un clic de inventarios de equipos y registros históricos de órdenes de trabajo para Excel o Power BI.
* **Telemetría IoT & Arduino:** Lectura serial directa y simulador de sensores de Temperatura (°C), Vibración RMS (ISO 10816) y Corriente (A).

### 3. 📱 Portal Móvil & Tablet para Técnicos de Campo
* **Interfaz Táctil Adaptativa:** Diseñada para smartphones y tablets en campo, sin necesidad de instalar apps nativas.
* **Privacidad Estricta de Órdenes:** Cada técnico **únicamente visualiza sus órdenes asignadas** y las órdenes públicas de planta.
* **Bandeja de Disponibles:** Pestaña *"Disponibles para Todos ✋"* que permite a los técnicos autoasignarse órdenes libres con un solo toque.
* **Informe Guiado de Cierre Técnico:** Al completar una labor, el técnico registra el trabajo efectuado, los repuestos/materiales utilizados, el tiempo de paro y el costo liquidado.

### 4. 🔐 Seguridad, RBAC y Cambio de Contraseña Permanente
* Autenticación con contraseñas seguras cifradas mediante **PBKDF2-HMAC-SHA256**.
* **Cambio de Contraseña Permanente Multi-Dispositivo:** Cuando un técnico o administrador actualiza su contraseña, el cambio se graba de inmediato en la base de datos en la nube. La contraseña anterior queda invalidada en todos los navegadores y dispositivos.
* Medidor dinámico de seguridad industrial: mínimo 8 caracteres, validación de mayúsculas, minúsculas y caracteres numéricos/símbolos.
* **Usuarios y Credenciales Predeterminadas:**
  * **Administrador:** `admin` / `admin123` *(Administrador de Planta)*
  * **Técnico Mecánico:** `carlos` / `1234` *(Ing. Carlos Mendoza)*
  * **Técnico Eléctrico:** `laura` / `1234` *(Tec. Laura Ramos)*
  * **Técnico Predictivo:** `andres` / `1234` *(Tec. Andrés Silva)*

---

## 🏭 Datos Sembrados Iniciales

El sistema cuenta con un catálogo industrial preconfigurado:
* **8 Equipos Industriales:**
  1. `CMP-001` - Compresor Tornillo Rotativo GA-75
  2. `BMB-102` - Bomba Centrífuga Multietapa KSB-80
  3. `MTR-305` - Motor Eléctrico Trifásico Siemens 75HP
  4. `CNV-040` - Banda Transportadora Modular Mod-B
  5. `CAL-201` - Caldera Pirotubular de Vapor 500BHP
  6. `EXT-501` - Extrusora Industrial Doble Husillo 120mm
  7. `TOR-108` - Torre de Enfriamiento Tiro Inducido 350TR
  8. `GEN-602` - Generador Diesel Cummins 450kVA
* **13 Órdenes de Trabajo:** Distribuidas entre preventivas, correctivas y predictivas, incluyendo historial de órdenes completadas con informe técnico y órdenes pendientes para autoasignación.

---

## 🏛️ Estructura del Repositorio

```text
industrial-maintenance-system/
├── api/
│   └── index.py                # Entrada Serverless para despliegue en Vercel
├── css/                        # Hojas de estilo globales para Vercel
├── js/                         # Scripts del cliente para despliegue en Vercel
│   ├── app.js                  # Lógica del panel de administración y KPIs
│   ├── auth.js                 # Control de autenticación, sesión y cambio de clave
│   ├── storage.js              # Motor de persistencia en la nube y multi-pestaña
│   └── tecnico.js              # Lógica del portal móvil para técnicos
├── public/                     # Archivos estáticos para el servidor web Python local
│   ├── css/
│   ├── js/
│   ├── index.html
│   ├── login.html
│   └── tecnico.html
├── data/
│   ├── cmms.db                 # Base de datos relacional local SQLite
│   └── notifications_config.json
├── src/
│   ├── database/               # Esquema relacional y gestor SQLite
│   ├── models/                 # Modelos de dominio (User, Equipment, WorkOrder)
│   ├── services/               # Lógica de negocio (Auth, OTs, Equipos, KPIs, IoT)
│   ├── ui/                     # Interfaz de terminal CLI
│   └── web/                    # Servidor HTTP REST API
├── tests/                      # Suite completa de pruebas automatizadas (20 tests)
├── index.html                  # Panel General del Administrador (raíz Vercel)
├── login.html                  # Pantalla de Autenticación Unificada (raíz Vercel)
├── tecnico.html                # Portal Móvil de Técnicos (raíz Vercel)
├── run_web.py                  # Lanzador del servidor web local en Python
├── main.py                     # Lanzador de la consola de comandos interactiva
├── vercel.json                 # Reglas de enrutamiento y rewrite para Vercel
├── requirements.txt            # Dependencias opcionales (pyserial)
└── README.md                   # Documentación oficial del proyecto
```

---

## 🚀 Ejecución en Entorno Local

### 1. Iniciar la Aplicación Web
```bash
python run_web.py
```
El servidor arrancará en el puerto `5000` y podrás acceder a:
* **Acceso / Login:** [http://localhost:5000/login](http://localhost:5000/login)
* **Panel General (Admin):** [http://localhost:5000/](http://localhost:5000/)
* **Portal Móvil de Técnicos:** [http://localhost:5000/tecnico](http://localhost:5000/tecnico)

### 2. Ejecutar la Consola Interactiva (CLI)
Si prefieres interactuar desde la terminal:
```bash
python main.py
```

---

## 🌐 Despliegue en Vercel

El proyecto está 100% optimizado para Vercel:
1. Sube este repositorio a tu cuenta de **GitHub**.
2. Ingresa a [vercel.com](https://vercel.com) e inicia sesión.
3. Haz clic en **"Add New..."** ➔ **"Project"** y selecciona el repositorio.
4. Presiona **"Deploy"** (no requiere configurar variables de entorno adicionales).
5. En menos de un minuto tendrás tu sistema funcionando en Internet con HTTPS seguro y persistencia en la nube.

---

## 🧪 Pruebas Automatizadas

El proyecto incluye una suite de 20 pruebas unitarias y de integración que validan el 100% de los flujos críticos:
```bash
python -m unittest discover tests
```

**Cobertura de pruebas:**
* Autenticación, RBAC y cambio de contraseñas.
* Filtrado estricto de órdenes de trabajo por técnico asignado.
* Ciclo de vida completo de OTs (PENDING ➔ IN_PROGRESS ➔ COMPLETED).
* Cálculo de métricas de confiabilidad (MTBF, MTTR, Disponibilidad).
* Detección de anomalías en telemetría IoT y generación predictiva de OTs.
* Endpoints REST HTTP y entrega de archivos estáticos.

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

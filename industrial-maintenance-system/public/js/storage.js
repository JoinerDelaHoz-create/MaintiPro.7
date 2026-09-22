/**
 * CMMS Industrial - Shared Persistent Storage Engine
 * Supports JSONBin.io cloud persistence across devices & browsers,
 * with seamless local persistence (localStorage) and real-time tab sync (BroadcastChannel).
 */

// Configuration for JSONBin.io cloud sync
// If an API key is set, data is stored permanently in the cloud and shared across all devices.
const DEFAULT_JSONBIN_API_KEY = '$2a$10$L/6x8ofjtzxCHgNgTnPh7OwSeB7Qlgv7hShyFgrkDWpOuQ8i3tXgy';
const DEFAULT_JSONBIN_BIN_ID  = '6ab1ca50ac6210605ae79be9';
const JSONBIN_BASE_URL = 'https://api.jsonbin.io/v3';

const LS_WORK_ORDERS = 'cmms_demo_work_orders';
const LS_EQUIPMENTS  = 'cmms_demo_equipments';
const LS_PASSWORDS   = 'cmms_custom_passwords';
const LS_CLOUD_KEY   = 'cmms_jsonbin_api_key';
const LS_CLOUD_BIN   = 'cmms_jsonbin_bin_id';

const DEMO_WORK_ORDERS = [
  { id:1,  equipment_code:'CMP-001', title:'Mantenimiento Preventivo 2000h: Filtros y Aceite Sintetico',          description:'Cambio de cartucho separador de aceite, filtro de aire y sustitucion de 20L de lubricante sintetico ISO VG 46.',                                                                    type:'PREVENTIVE',  priority:'HIGH',     status:'IN_PROGRESS', assigned_technician:'Ing. Carlos Mendoza',  downtime_hours:0.0, cost:0.0,   created_at:'2026-09-18 09:00:00', closed_at:null },
  { id:2,  equipment_code:'CNV-040', title:'Ajuste de tension y alineacion de banda transportadora',              description:'Se detecta leve desalineacion lateral en el rodillo tensor de cola provocando friccion en el chasis.',                                                                           type:'CORRECTIVE',  priority:'MEDIUM',   status:'PENDING',     assigned_technician:'Ing. Carlos Mendoza',  downtime_hours:0.0, cost:0.0,   created_at:'2026-09-19 11:30:00', closed_at:null },
  { id:3,  equipment_code:'EXT-501', title:'Inspeccion Termografica en Resistencias y Reductor',                  description:'Termografia infrarroja completada. Zona 3 retorqueada. Temperaturas normalizadas.',                                                                                               type:'PREDICTIVE',  priority:'MEDIUM',   status:'COMPLETED',   assigned_technician:'Ing. Carlos Mendoza',  downtime_hours:1.5, cost:280.0, created_at:'2026-09-17 08:00:00', closed_at:'2026-09-17 12:30:00' },
  { id:4,  equipment_code:'GEN-602', title:'Prueba en Vacio y Verificacion de Baterias de Arranque',              description:'Comprobacion de electrolito, tension en flotacion (27.4V DC), limpieza de bornes y arranque de prueba 15 min.',                                                                 type:'PREVENTIVE',  priority:'LOW',      status:'PENDING',     assigned_technician:'Tec. Laura Ramos',     downtime_hours:0.0, cost:0.0,   created_at:'2026-09-19 14:00:00', closed_at:null },
  { id:5,  equipment_code:'MTR-305', title:'Correccion de Sobrecorriente y Reemplazo de Contactor',               description:'El contactor de linea principal presenta arqueo en polos 1 y 3 provocando disparo termico intermitente.',                                                                       type:'CORRECTIVE',  priority:'HIGH',     status:'IN_PROGRESS', assigned_technician:'Tec. Laura Ramos',     downtime_hours:0.0, cost:0.0,   created_at:'2026-09-18 10:15:00', closed_at:null },
  { id:6,  equipment_code:'MTR-305', title:'Medicion de Resistencia de Aislamiento (Megohmetro)',                 description:'Lectura de aislamiento mayor a 850 Megaohms. Empaques cambiados.',                                                                                                              type:'PREDICTIVE',  priority:'MEDIUM',   status:'COMPLETED',   assigned_technician:'Tec. Laura Ramos',     downtime_hours:2.0, cost:420.0, created_at:'2026-09-16 13:00:00', closed_at:'2026-09-16 16:30:00' },
  { id:7,  equipment_code:'CAL-201', title:'Purga de Fondo y Calibracion de Presostatos',                         description:'Maniobra de purga de lodos en caldera, control de nivel McDonnell Miller y test de disparo por sobrepresion.',                                                                  type:'PREVENTIVE',  priority:'HIGH',     status:'PENDING',     assigned_technician:'Tec. Andres Silva',    downtime_hours:0.0, cost:0.0,   created_at:'2026-09-19 07:30:00', closed_at:null },
  { id:8,  equipment_code:'BMB-102', title:'Reemplazo de Sello Mecanico de Cartucho por Goteo',                   description:'Goteo continuo de 15 gotas/min en prensaestopas lado bomba; desmontaje y montaje de nuevo sello.',                                                                              type:'CORRECTIVE',  priority:'CRITICAL', status:'IN_PROGRESS', assigned_technician:'Tec. Andres Silva',    downtime_hours:0.0, cost:0.0,   created_at:'2026-09-18 15:45:00', closed_at:null },
  { id:9,  equipment_code:'TOR-108', title:'Analisis de Vibraciones FFT en Ventilador de Tiro',                   description:'Aspas limpias con hidrolavadora. Vibracion bajo de 4.8 a 1.2 mm/s RMS.',                                                                                                        type:'PREDICTIVE',  priority:'MEDIUM',   status:'COMPLETED',   assigned_technician:'Tec. Andres Silva',    downtime_hours:1.0, cost:180.0, created_at:'2026-09-15 10:00:00', closed_at:'2026-09-15 13:00:00' },
  { id:10, equipment_code:'EXT-501', title:'Lubricacion de Crapodina y Engranajes Planetarios',                   description:'Engrase general con bomba neumatica en los puntos centralizados del cabezal extrusor.',                                                                                          type:'PREVENTIVE',  priority:'MEDIUM',   status:'PENDING',     assigned_technician:'Sin Asignar',          downtime_hours:0.0, cost:0.0,   created_at:'2026-09-20 08:30:00', closed_at:null },
  { id:11, equipment_code:'CAL-201', title:'Fuga de Vapor en Brida de Valvula de Seguridad #2',                   description:'Vapor visible en junta espirometalica. Requiere despresurizar linea secundaria y cambio de empaque.',                                                                             type:'CORRECTIVE',  priority:'CRITICAL', status:'PENDING',     assigned_technician:'Sin Asignar',          downtime_hours:0.0, cost:0.0,   created_at:'2026-09-20 10:15:00', closed_at:null },
  { id:12, equipment_code:'CMP-001', title:'Monitoreo Acustico de Ultrasonido en Red de Aire',                    description:'Rastreo con detector de ultrasonido digital en colectores de 4 pulgadas y derivaciones.',                                                                                        type:'PREDICTIVE',  priority:'LOW',      status:'PENDING',     assigned_technician:'Sin Asignar',          downtime_hours:0.0, cost:0.0,   created_at:'2026-09-20 13:45:00', closed_at:null },
  { id:13, equipment_code:'TOR-108', title:'Sustitucion de Sensor de Flujo y Valvula Solenoide',                  description:'La valvula solenoide de reposicion de agua tratada no cierra hermeticamente provocando desborde leve.',                                                                           type:'CORRECTIVE',  priority:'HIGH',     status:'PENDING',     assigned_technician:'Sin Asignar',          downtime_hours:0.0, cost:0.0,   created_at:'2026-09-21 09:00:00', closed_at:null },
];

const DEMO_EQUIPMENTS = [
  { code:'CMP-001', name:'Compresor Tornillo Rotativo GA-75',           type:'Neumatico / Aire',         location:'Sala de Compresores - Nave A',         status:'MAINTENANCE', operating_hours:1850.5, created_at:'2026-09-14 08:00:00' },
  { code:'BMB-102', name:'Bomba Centrifuga Multietapa KSB-80',          type:'Hidraulico / Bombeo',      location:'Linea de Enfriamiento Principal',       status:'MAINTENANCE', operating_hours:3420.0, created_at:'2026-09-14 08:00:00' },
  { code:'MTR-305', name:'Motor Electrico Trifasico Siemens 75HP',      type:'Electrico / Potencia',     location:'Molino Principal #1',                  status:'MAINTENANCE', operating_hours:5210.0, created_at:'2026-09-14 08:00:00' },
  { code:'CNV-040', name:'Banda Transportadora Modular Mod-B',          type:'Mecanico / Transporte',    location:'Area de Empaque y Paletizado',          status:'OPERATIONAL', operating_hours:980.5,  created_at:'2026-09-14 08:00:00' },
  { code:'CAL-201', name:'Caldera Pirotubular de Vapor 500BHP',         type:'Termico / Vapor',          location:'Planta de Servicios Termicos',          status:'WARNING',     operating_hours:4120.0, created_at:'2026-09-14 08:00:00' },
  { code:'EXT-501', name:'Extrusora Industrial Doble Husillo 120mm',    type:'Mecanico / Plasticos',     location:'Nave de Extrusion #3',                 status:'OPERATIONAL', operating_hours:2145.0, created_at:'2026-09-14 08:00:00' },
  { code:'TOR-108', name:'Torre de Enfriamiento Tiro Inducido 350TR',   type:'Refrigeracion / Termico',  location:'Patio de Servicios Exteriores',         status:'OPERATIONAL', operating_hours:3890.0, created_at:'2026-09-14 08:00:00' },
  { code:'GEN-602', name:'Generador Diesel Cummins 450kVA',             type:'Generacion Electrica',     location:'Subestacion Electrica #2',              status:'OPERATIONAL', operating_hours:620.0,  created_at:'2026-09-14 08:00:00' },
];

const DEMO_PASSWORDS = { admin:'admin123', carlos:'1234', laura:'1234', andres:'1234' };

// Real-time broadcast channel for multi-tab synchronization
const _syncChannel = typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel('cmms_sync') : null;

function _broadcastChange(entity, payload) {
  if (_syncChannel) {
    try {
      _syncChannel.postMessage({ entity, payload, timestamp: Date.now() });
    } catch (e) {
      // ignore
    }
  }
}

// Helpers for API key & bin resolution
function _getApiKey() {
  const custom = localStorage.getItem(LS_CLOUD_KEY);
  if (custom && custom.trim().length > 10) return custom.trim();
  return DEFAULT_JSONBIN_API_KEY.trim();
}

function _getBinId() {
  const custom = localStorage.getItem(LS_CLOUD_BIN);
  if (custom && custom.trim().length > 5) return custom.trim();
  return DEFAULT_JSONBIN_BIN_ID.trim();
}

function _isCloudConfigured() {
  const key = _getApiKey();
  return Boolean(key && key.length > 10 && !key.includes('PLACEHOLDER'));
}

// Master state management: keeps workOrders, equipments, passwords in sync
async function _fetchMasterState() {
  const apiKey = _getApiKey();
  const binId = _getBinId();

  if (_isCloudConfigured() && binId) {
    try {
      const res = await fetch(`${JSONBIN_BASE_URL}/b/${binId}/latest`, {
        headers: {
          'X-Master-Key': apiKey,
          'X-Bin-Meta': 'false',
        },
      });
      if (res.ok) {
        const cloudData = await res.json();
        if (cloudData && typeof cloudData === 'object') {
          if (Array.isArray(cloudData.workOrders)) {
            localStorage.setItem(LS_WORK_ORDERS, JSON.stringify(cloudData.workOrders));
          }
          if (Array.isArray(cloudData.equipments)) {
            localStorage.setItem(LS_EQUIPMENTS, JSON.stringify(cloudData.equipments));
          }
          if (cloudData.passwords && typeof cloudData.passwords === 'object') {
            localStorage.setItem(LS_PASSWORDS, JSON.stringify(cloudData.passwords));
          }
          return cloudData;
        }
      }
    } catch (err) {
      console.warn('[CmmsStorage] Cloud read fallback:', err.message);
    }
  }

  // Fallback to local storage
  let wos = [];
  let eqs = [];
  let pwds = {};
  try { wos = JSON.parse(localStorage.getItem(LS_WORK_ORDERS) || '[]'); } catch(e){}
  try { eqs = JSON.parse(localStorage.getItem(LS_EQUIPMENTS) || '[]'); } catch(e){}
  try { pwds = JSON.parse(localStorage.getItem(LS_PASSWORDS) || '{}'); } catch(e){}

  if (!Array.isArray(wos) || wos.length === 0) {
    wos = JSON.parse(JSON.stringify(DEMO_WORK_ORDERS));
    localStorage.setItem(LS_WORK_ORDERS, JSON.stringify(wos));
  }
  if (!Array.isArray(eqs) || eqs.length === 0) {
    eqs = JSON.parse(JSON.stringify(DEMO_EQUIPMENTS));
    localStorage.setItem(LS_EQUIPMENTS, JSON.stringify(eqs));
  }
  if (!pwds || Object.keys(pwds).length === 0) {
    pwds = { ...DEMO_PASSWORDS };
    localStorage.setItem(LS_PASSWORDS, JSON.stringify(pwds));
  }

  return { workOrders: wos, equipments: eqs, passwords: pwds };
}

async function _saveMasterState(state) {
  if (state.workOrders) localStorage.setItem(LS_WORK_ORDERS, JSON.stringify(state.workOrders));
  if (state.equipments) localStorage.setItem(LS_EQUIPMENTS, JSON.stringify(state.equipments));
  if (state.passwords)  localStorage.setItem(LS_PASSWORDS, JSON.stringify(state.passwords));

  const apiKey = _getApiKey();
  let binId = _getBinId();

  if (_isCloudConfigured()) {
    try {
      if (!binId) {
        // Auto-create initial cloud bin
        const createRes = await fetch(`${JSONBIN_BASE_URL}/b`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Master-Key': apiKey,
            'X-Bin-Name': 'cmms-industrial-db',
            'X-Bin-Private': 'true',
          },
          body: JSON.stringify(state),
        });
        if (createRes.ok) {
          const createData = await createRes.json();
          const newBinId = createData.metadata ? createData.metadata.id : null;
          if (newBinId) {
            localStorage.setItem(LS_CLOUD_BIN, newBinId);
            console.info('[CmmsStorage] Cloud database bin initialized with ID:', newBinId);
          }
        }
      } else {
        // Update existing bin
        await fetch(`${JSONBIN_BASE_URL}/b/${binId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'X-Master-Key': apiKey,
          },
          body: JSON.stringify(state),
        });
      }
    } catch (err) {
      console.warn('[CmmsStorage] Cloud write sync fallback:', err.message);
    }
  }
}

// ============================================================
// Public Storage API
// ============================================================
const CmmsStorage = {

  // --- Work Orders ---
  async getWorkOrders() {
    const state = await _fetchMasterState();
    return state.workOrders || [];
  },

  async saveWorkOrders(wos) {
    const state = await _fetchMasterState();
    state.workOrders = wos;
    await _saveMasterState(state);
    _broadcastChange('work_orders', wos);
  },

  async createWorkOrder(payload) {
    const orders = await this.getWorkOrders();
    const maxId = orders.reduce((m, o) => Math.max(m, parseInt(o.id) || 0), 0);
    const now = new Date().toISOString().replace('T', ' ').substring(0, 19);

    const wo = {
      id: maxId + 1,
      equipment_code: payload.equipment_code,
      title: payload.title,
      description: payload.description || '',
      type: payload.type || 'PREVENTIVE',
      priority: payload.priority || 'MEDIUM',
      status: 'PENDING',
      assigned_technician: payload.assigned_technician || 'Sin Asignar',
      downtime_hours: 0.0,
      cost: 0.0,
      created_at: now,
      closed_at: null,
    };

    orders.unshift(wo);
    await this.saveWorkOrders(orders);
    return wo;
  },

  async updateWorkOrder(id, changes) {
    const orders = await this.getWorkOrders();
    const numId = parseInt(id);
    const idx = orders.findIndex((o) => parseInt(o.id) === numId);
    if (idx === -1) {
      throw new Error(`Orden de Trabajo #${id} no encontrada.`);
    }

    orders[idx] = { ...orders[idx], ...changes };
    await this.saveWorkOrders(orders);
    return orders[idx];
  },

  async claimWorkOrder(id, techName) {
    return this.updateWorkOrder(id, {
      assigned_technician: techName,
      status: 'IN_PROGRESS',
    });
  },

  async startWorkOrder(id) {
    return this.updateWorkOrder(id, {
      status: 'IN_PROGRESS',
    });
  },

  async finishWorkOrder(id, { work_done, materials_used, downtime_hours, cost }) {
    const orders = await this.getWorkOrders();
    const numId = parseInt(id);
    const wo = orders.find((o) => parseInt(o.id) === numId);
    const now = new Date().toISOString().replace('T', ' ').substring(0, 19);
    const report = `\n\n--- INFORME DE CIERRE TÉCNICO ---\n- Trabajo realizado: ${work_done}\n- Materiales / Repuestos: ${materials_used}`;

    return this.updateWorkOrder(id, {
      status: 'COMPLETED',
      downtime_hours: parseFloat(downtime_hours) || 0,
      cost: parseFloat(cost) || 0,
      closed_at: now,
      description: (wo ? (wo.description || '') : '') + report,
    });
  },

  async cancelWorkOrder(id) {
    return this.updateWorkOrder(id, {
      status: 'CANCELLED',
      closed_at: new Date().toISOString().replace('T', ' ').substring(0, 19),
    });
  },

  // --- Equipments ---
  async getEquipments() {
    const state = await _fetchMasterState();
    return state.equipments || [];
  },

  async saveEquipments(eqs) {
    const state = await _fetchMasterState();
    state.equipments = eqs;
    await _saveMasterState(state);
    _broadcastChange('equipments', eqs);
  },

  async createEquipment(payload) {
    const eqs = await this.getEquipments();
    const cleanCode = (payload.code || '').trim().toUpperCase();
    if (eqs.some((e) => e.code.toUpperCase() === cleanCode)) {
      throw new Error(`El activo '${cleanCode}' ya existe en el inventario.`);
    }

    const now = new Date().toISOString().replace('T', ' ').substring(0, 19);
    const eq = {
      code: cleanCode,
      name: (payload.name || '').trim(),
      type: (payload.type || 'General').trim(),
      location: (payload.location || 'Planta Principal').trim(),
      status: 'OPERATIONAL',
      operating_hours: parseFloat(payload.operating_hours) || 0,
      created_at: now,
    };

    eqs.push(eq);
    await this.saveEquipments(eqs);
    return eq;
  },

  async updateEquipment(code, changes) {
    const eqs = await this.getEquipments();
    const idx = eqs.findIndex((e) => e.code.toUpperCase() === code.toUpperCase());
    if (idx === -1) {
      throw new Error(`Equipo '${code}' no encontrado.`);
    }

    eqs[idx] = { ...eqs[idx], ...changes };
    await this.saveEquipments(eqs);
    return eqs[idx];
  },

  async deleteEquipment(code) {
    const eqs = await this.getEquipments();
    const filtered = eqs.filter((e) => e.code.toUpperCase() !== code.toUpperCase());
    if (filtered.length === eqs.length) {
      throw new Error(`Equipo '${code}' no encontrado.`);
    }

    await this.saveEquipments(filtered);
  },

  // --- Passwords & Authentication Persistence ---
  async getPasswords() {
    const state = await _fetchMasterState();
    return state.passwords || { ...DEMO_PASSWORDS };
  },

  async changePassword(username, currentPassword, newPassword) {
    const usr = (username || '').toLowerCase().trim();
    const state = await _fetchMasterState();
    const pwds = state.passwords || { ...DEMO_PASSWORDS };

    const effective = pwds[usr] !== undefined ? pwds[usr] : (DEMO_PASSWORDS[usr] || null);
    if (effective === null) {
      throw new Error('Usuario no encontrado');
    }
    if (effective !== currentPassword) {
      throw new Error('La contraseña actual es incorrecta');
    }

    pwds[usr] = newPassword;
    state.passwords = pwds;
    await _saveMasterState(state);
    _broadcastChange('password', { username: usr });
    return true;
  },

  async verifyPassword(username, password) {
    const usr = (username || '').toLowerCase().trim();
    const state = await _fetchMasterState();
    const pwds = state.passwords || { ...DEMO_PASSWORDS };
    const effective = pwds[usr] !== undefined ? pwds[usr] : (DEMO_PASSWORDS[usr] || null);
    return effective === password;
  },

  // --- Cloud Configuration API ---
  isCloudConfigured() {
    return _isCloudConfigured();
  },

  getCloudStatus() {
    return {
      configured: _isCloudConfigured(),
      apiKey: _getApiKey() ? `${_getApiKey().substring(0, 8)}...` : null,
      binId: _getBinId() || null,
    };
  },

  setCloudConfig(apiKey, binId) {
    if (apiKey !== undefined) {
      if (apiKey) localStorage.setItem(LS_CLOUD_KEY, apiKey.trim());
      else localStorage.removeItem(LS_CLOUD_KEY);
    }
    if (binId !== undefined) {
      if (binId) localStorage.setItem(LS_CLOUD_BIN, binId.trim());
      else localStorage.removeItem(LS_CLOUD_BIN);
    }
  },

  onSync(callback) {
    if (_syncChannel) {
      _syncChannel.onmessage = (event) => {
        if (callback) callback(event.data);
      };
    }
  },
};

// Export to window
window.CmmsStorage = CmmsStorage;

import prisma from '../config/db.js';
import bcrypt from 'bcryptjs';

/**
 * registerEmpresa
 * Registra una nueva empresa con sus servicios de accesibilidad.
 * Crea tanto el registro de la empresa como el de accesibilidad asociado.
 * @param {{nombre:string,email:string,password:string,serviciosAccesibilidad:object,detallesAccesibilidad:object}} param0
 */
export const registerEmpresa = async ({ 
  nombre, 
  email, 
  password, 
  serviciosAccesibilidad, 
  detallesAccesibilidad 
}) => {
  // Verificar si la empresa ya existe
  const empresaExists = await prisma.company.findUnique({ where: { email } });
  if (empresaExists) throw new Error('La empresa ya existe');

  // Hashear la contraseña
  const hashedPassword = await bcrypt.hash(password, 10);

  // Crear la empresa y su accesibilidad en una transacción
  const result = await prisma.$transaction(async (tx) => {
    // Crear la empresa
    const empresa = await tx.company.create({
      data: {
        name: nombre,
        email,
        password: hashedPassword,
        publicado: false
      }
    });

    // Crear el registro de accesibilidad asociado
    const accesibilidad = await tx.accessibility.create({
      data: {
        company_id: empresa.id,
        // Accesibilidad física
        hallways_min_90cm: serviciosAccesibilidad.pasillosMin90cm || false,
        ramp: serviciosAccesibilidad.rampa || false,
        door_80cm: serviciosAccesibilidad.puerta80cm || false,
        non_slip_floors: serviciosAccesibilidad.pisosAntideslizantes || false,
        accessible_bathroom: serviciosAccesibilidad.banoAccesible || false,
        adapted_tables_chairs: serviciosAccesibilidad.mesasSillasAdaptadas || false,
        elevator: serviciosAccesibilidad.ascensor || false,
        // Adaptabilidad accesible
        braille_signage: serviciosAccesibilidad.senalizacionBraille || false,
        color_contrast: serviciosAccesibilidad.contrasteColores || false,
        podotactile_guides: serviciosAccesibilidad.guiasPodotactiles || false,
        emergency_alarms: serviciosAccesibilidad.alarmasEmergencia || false,
        hearing_aid_system: serviciosAccesibilidad.sistemaAudifonos || false,
        // Campos adicionales
        adapted_bathroom_quantity: detallesAccesibilidad.banoAdaptadoCantidad || null,
        adapted_bathroom_details: detallesAccesibilidad.banoAdaptadoDetalles || null,
        priority_attention_type: detallesAccesibilidad.atencionPrioritariaTipo || null,
        priority_attention_schedule: detallesAccesibilidad.atencionPrioritariaHorario || null,
        other_services: detallesAccesibilidad.otrosServicios || null
      }
    });

    return { empresa, accesibilidad };
  });

  return result;
};

/**
 * findByEmail
 * Busca una empresa por email.
 */
export const findByEmail = async (email) => {
  return await prisma.company.findUnique({ 
    where: { email },
    include: {
      accessibilityDetails: true
    }
  });
};

/**
 * getAllEmpresas
 * Obtiene todas las empresas con sus datos de accesibilidad.
 */
export const getAllEmpresas = async () => {
  return await prisma.company.findMany({
    include: {
      accessibilityDetails: true
    },
    orderBy: {
      id: 'desc'
    }
  });
};

/**
 * getEmpresaById
 * Obtiene una empresa específica por ID con sus datos de accesibilidad.
 */
export const getEmpresaById = async (id) => {
  return await prisma.company.findUnique({
    where: { id: parseInt(id) },
    include: {
      accessibilityDetails: true
    }
  });
};

/**
 * updateEmpresaAccesibilidad
 * Actualiza los datos de accesibilidad de una empresa existente.
 */
export const updateEmpresaAccesibilidad = async (empresaId, serviciosAccesibilidad, detallesAccesibilidad) => {
  return await prisma.accessibility.update({
    where: { company_id: empresaId },
    data: {
      // Accesibilidad física
      hallways_min_90cm: serviciosAccesibilidad.pasillosMin90cm || false,
      ramp: serviciosAccesibilidad.rampa || false,
      door_80cm: serviciosAccesibilidad.puerta80cm || false,
      non_slip_floors: serviciosAccesibilidad.pisosAntideslizantes || false,
      accessible_bathroom: serviciosAccesibilidad.banoAccesible || false,
      adapted_tables_chairs: serviciosAccesibilidad.mesasSillasAdaptadas || false,
      elevator: serviciosAccesibilidad.ascensor || false,
      // Adaptabilidad accesible
      braille_signage: serviciosAccesibilidad.senalizacionBraille || false,
      color_contrast: serviciosAccesibilidad.contrasteColores || false,
      podotactile_guides: serviciosAccesibilidad.guiasPodotactiles || false,
      emergency_alarms: serviciosAccesibilidad.alarmasEmergencia || false,
      hearing_aid_system: serviciosAccesibilidad.sistemaAudifonos || false,
      // Campos adicionales
      adapted_bathroom_quantity: detallesAccesibilidad.banoAdaptadoCantidad || null,
      adapted_bathroom_details: detallesAccesibilidad.banoAdaptadoDetalles || null,
      priority_attention_type: detallesAccesibilidad.atencionPrioritariaTipo || null,
      priority_attention_schedule: detallesAccesibilidad.atencionPrioritariaHorario || null,
      other_services: detallesAccesibilidad.otrosServicios || null
    }
  });
};

// Objeto con lugares para el diálogo y roles
const places = {
  "office": {
    name: "Oficina",
    roles: {
      "manager": "Gerente",
      "developer": "Desarrollador",
      "designer": "Diseñador",
      "employee": "Empleado",
      "client": "Cliente",
      "secretary": "Secretario",
      "receptionist": "Recepcionista",
      "human resources": "Recursos Humanos",
      "accountant": "Contador",
      "intern": "Becario"
    }
  },
  "park": {
    name: "Parque",
    roles: {
      "pedestrian": "Peatón",
      "dog owner": "Dueño de perro",
      "cyclist": "Ciclista",
      "runner": "Corredor",
      "mother with pram": "Madre con carrito",
      "elderly person": "Anciano",
      "young runner": "Joven corredor",
      "tourist": "Turista",
      "vendor": "Vendedor",
      "gardener": "Jardinero"
    }
  },
  "house": {
    name: "Casa",
    roles: {
      "host": "Anfitrión",
      "guest": "Invitado",
      "family member": "Miembro de la familia",
      "neighbor": "Vecino",
      "repairman": "Reparador",
      "cleaner": "Limpiador",
      "child": "Niño",
      "roommate": "Compañero de piso",
      "partner": "Pareja",
      "pets": "Mascotas"
    }
  },
  "restaurant": {
    name: "Restaurante",
    roles: {
      "waiter": "Mesero",
      "customer": "Cliente",
      "chef": "Chef",
      "bartender": "Barman",
      "maitre": "Maitre",
      "manager": "Gerente",
      "host": "Anfitrión",
      "sommelier": "Sumiller",
      "cleaner": "Limpiador",
      "dishwasher": "Lavaplatos"
    }
  },
  "cafeteria": {
    name: "Cafetería",
    roles: {
      "barista": "Barista",
      "customer": "Cliente",
      "waiter": "Mesero",
      "musician": "Músico",
      "manager": "Gerente",
      "cook": "Cocinero",
      "cleaner": "Limpiador",
      "baker": "Panadero",
      "cashier": "Cajero",
      "bartender": "Barman"
    }
  },
  "library": {
    name: "Biblioteca",
    roles: {
      "reader": "Lector",
      "librarian": "Bibliotecario",
      "teacher": "Maestro",
      "researcher": "Investigador",
      "student": "Estudiante",
      "writer": "Escritor",
      "historian": "Historiador",
      "scientist": "Científico",
      "visitor": "Visitante",
      "library employee": "Empleado de biblioteca"
    }
  },
  "store": {
    name: "Tienda",
    roles: {
      "salesperson": "Dependiente",
      "customer": "Cliente",
      "cashier": "Cajero",
      "manager": "Gerente",
      "store assistant": "Asistente de tienda",
      "stock clerk": "Almacenista",
      "security guard": "Guardia de seguridad",
      "cleaner": "Limpiador",
      "delivery person": "Repartidor",
      "store owner": "Propietario de tienda"
    }
  },
  "street": {
    name: "Calle",
    roles: {
      "pedestrian": "Peatón",
      "driver": "Conductor",
      "postman": "Cartero",
      "policeman": "Policía",
      "cyclist": "Ciclista",
      "construction worker": "Trabajador de construcción",
      "musician": "Músico",
      "tourist": "Turista",
      "vendor": "Vendedor",
      "delivery person": "Repartidor"
    }
  },
  "square": {
    name: "Plaza",
    roles: {
      "pedestrian": "Peatón",
      "tourist": "Turista",
      "constructor": "Constructor",
      "sculptor": "Escultor",
      "photographer": "Fotógrafo",
      "musician": "Músico",
      "vendor": "Vendedor",
      "artist": "Artista",
      "child": "Niño",
      "runner": "Corredor"
    }
  },
  "shopping mall": {
    name: "Centro Comercial",
    roles: {
      "salesperson": "Dependiente",
      "customer": "Cliente",
      "consultant": "Consultor",
      "security guard": "Guardia de seguridad",
      "cashier": "Cajero",
      "manager": "Gerente",
      "cleaner": "Limpiador",
      "maintenance worker": "Trabajador de mantenimiento",
      "child": "Niño",
      "tourist": "Turista"
    }
  },
  "cinema": {
    name: "Cine",
    roles: {
      "ticket seller": "Vendedor de entradas",
      "viewer": "Espectador",
      "filmmaker": "Cineasta",
      "producer": "Productor",
      "director": "Director",
      "actor": "Actor",
      "sound engineer": "Ingeniero de audio",
      "stagehand": "Ayudante de escena",
      "lighting technician": "Iluminador",
      "security guard": "Guardia de seguridad"
    }
  },
  "gym": {
    name: "Gimnasio",
    roles: {
      "trainer": "Entrenador",
      "member": "Miembro",
      "receptionist": "Recepcionista",
      "cleaner": "Limpiador",
      "manager": "Gerente",
      "personal trainer": "Entrenador personal",
      "customer": "Cliente",
      "therapist": "Terapeuta",
      "physiotherapist": "Fisioterapeuta",
      "nutritionist": "Nutricionista"
    }
  },
  "hotel": {
    name: "Hotel",
    roles: {
      "guest": "Huésped",
      "receptionist": "Recepcionista",
      "housekeeper": "Camarera",
      "bellboy": "Botones",
      "manager": "Gerente",
      "waiter": "Mesero",
      "chef": "Chef",
      "cleaner": "Limpiador",
      "porter": "Portero",
      "tourist": "Turista"
    }
  },
  "factory": {
    name: "Fábrica",
    roles: {
      "worker": "Trabajador",
      "supervisor": "Supervisor",
      "manager": "Gerente",
      "engineer": "Ingeniero",
      "operator": "Operador",
      "laborer": "Obrero",
      "cleaner": "Limpiador",
      "technician": "Técnico",
      "storekeeper": "Almacenero",
      "salesperson": "Vendedor"
    }
  },
  "hospital": {
    name: "Hospital",
    roles: {
      "doctor": "Doctor",
      "nurse": "Enfermera",
      "patient": "Paciente",
      "surgeon": "Cirujano",
      "receptionist": "Recepcionista",
      "pharmacist": "Farmacéutico",
      "technician": "Técnico",
      "cleaner": "Limpiador",
      "therapist": "Terapeuta",
      "administrator": "Administrador"
    }
  },
  "airport": {
    name: "Aeropuerto",
    roles: {
      "pilot": "Piloto",
      "stewardess": "Azafata",
      "passenger": "Pasajero",
      "security guard": "Guardia de seguridad",
      "ticket agent": "Agente de boletos",
      "ground staff": "Personal de tierra",
      "baggage handler": "Manipulador de equipaje",
      "customs officer": "Oficial de aduanas",
      "airport manager": "Gerente del aeropuerto",
      "shop assistant": "Asistente de tienda"
    }
  },
  "university": {
    name: "Universidad",
    roles: {
      "professor": "Profesor",
      "student": "Estudiante",
      "teaching assistant": "Asistente de enseñanza",
      "administrator": "Administrador",
      "researcher": "Investigador",
      "librarian": "Bibliotecario",
      "coach": "Entrenador",
      "advisor": "Asesor",
      "graduate": "Graduado",
      "visitor": "Visitante"
    }
  },
  "court": {
    name: "Tribunal",
    roles: {
      "judge": "Juez",
      "lawyer": "Abogado",
      "defendant": "Demandado",
      "prosecutor": "Fiscal",
      "witness": "Testigo",
      "court clerk": "Secretario del tribunal",
      "bailiff": "Alguacil",
      "juror": "Juradista",
      "court reporter": "Estenógrafo",
      "defense attorney": "Abogado defensor"
    }
  },
  "stadium": {
    name: "Estadio",
    roles: {
      "player": "Jugador",
      "coach": "Entrenador",
      "referee": "Árbitro",
      "spectator": "Espectador",
      "security guard": "Guardia de seguridad",
      "commentator": "Comentarista",
      "photographer": "Fotógrafo",
      "vendor": "Vendedor",
      "manager": "Gerente",
      "physio": "Fisioterapeuta"
    }
  },
  "beach": {
    name: "Playa",
    roles: {
      "swimmer": "Nadador",
      "lifeguard": "Socorrista",
      "tourist": "Turista",
      "vendor": "Vendedor",
      "beach cleaner": "Limpiador de playa",
      "surfer": "Surfista",
      "sunbather": "Tomador de sol",
      "dog owner": "Dueño de perro",
      "fisherman": "Pescador",
      "child": "Niño"
    }
  },
  "museum": {
    name: "Museo",
    roles: {
      "visitor": "Visitante",
      "guide": "Guía",
      "curator": "Curador",
      "archaeologist": "Arqueólogo",
      "artist": "Artista",
      "historian": "Historiador",
      "security guard": "Guardia de seguridad",
      "researcher": "Investigador",
      "student": "Estudiante",
      "collector": "Coleccionista"
    }
  },
  "farm": {
    name: "Granja",
    roles: {
      "farmer": "Granjero",
      "worker": "Trabajador",
      "animal keeper": "Cuidador de animales",
      "vendor": "Vendedor",
      "tourist": "Turista",
      "child": "Niño",
      "gardener": "Jardinero",
      "mechanic": "Mecánico",
      "veterinarian": "Veterinario",
      "housekeeper": "Camarera"
    }
  },
  "construction site": {
    name: "Sitio de construcción",
    roles: {
      "builder": "Constructor",
      "architect": "Arquitecto",
      "engineer": "Ingeniero",
      "foreman": "Capataz",
      "worker": "Trabajador",
      "security guard": "Guardia de seguridad",
      "construction manager": "Gerente de construcción",
      "truck driver": "Conductor de camión",
      "laborer": "Obrero",
      "electrician": "Electricista"
    }
  },
  "zoo": {
    name: "Zoológico",
    roles: {
      "visitor": "Visitante",
      "zookeeper": "Cuidador de zoológico",
      "tourist": "Turista",
      "vet": "Veterinario",
      "cleaner": "Limpiador",
      "photographer": "Fotógrafo",
      "guide": "Guía",
      "animal trainer": "Entrenador de animales",
      "scientist": "Científico",
      "vendor": "Vendedor"
    }
  },
  "airport terminal": {
    name: "Terminal de aeropuerto",
    roles: {
      "passenger": "Pasajero",
      "ticket agent": "Agente de boletos",
      "security guard": "Guardia de seguridad",
      "ground staff": "Personal de tierra",
      "baggage handler": "Manipulador de equipaje",
      "shop assistant": "Asistente de tienda",
      "tourist": "Turista",
      "customs officer": "Oficial de aduanas",
      "airport manager": "Gerente del aeropuerto",
      "guide": "Guía"
    }
  },
  "night club": {
    name: "Club nocturno",
    roles: {
      "dj": "DJ",
      "bartender": "Barman",
      "security guard": "Guardia de seguridad",
      "customer": "Cliente",
      "dancer": "Bailarín",
      "waiter": "Mesero",
      "manager": "Gerente",
      "host": "Anfitrión",
      "cleaner": "Limpiador",
      "musician": "Músico"
    }
  },
  "amusement park": {
    name: "Parque de diversiones",
    roles: {
      "visitor": "Visitante",
      "ride operator": "Operador de atracciones",
      "security guard": "Guardia de seguridad",
      "cleaner": "Limpiador",
      "vendor": "Vendedor",
      "tourist": "Turista",
      "animator": "Animador",
      "show performer": "Intérprete",
      "manager": "Gerente",
      "mechanic": "Mecánico"
    }
  },
  "supermarket": {
    name: "Supermercado",
    roles: {
      "cashier": "Cajero",
      "customer": "Cliente",
      "manager": "Gerente",
      "stock clerk": "Almacenista",
      "security guard": "Guardia de seguridad",
      "cleaner": "Limpiador",
      "vendor": "Vendedor",
      "delivery person": "Repartidor",
      "meat cutter": "Cortador de carne",
      "bakery assistant": "Asistente de panadería"
    }
  },
  "theater": {
    name: "Teatro",
    roles: {
      "actor": "Actor",
      "director": "Director",
      "spectator": "Espectador",
      "stage manager": "Gerente de escenario",
      "lighting technician": "Iluminador",
      "sound technician": "Técnico de sonido",
      "usher": "Portero",
      "costume designer": "Diseñador de vestuario",
      "makeup artist": "Maquillador",
      "ticket seller": "Vendedor de entradas"
    }
  },
  "ski resort": {
    name: "Estación de esquí",
    roles: {
      "skier": "Esquiador",
      "snowboarder": "Snowboarder",
      "instructor": "Instructor",
      "visitor": "Visitante",
      "lift operator": "Operador de telesquí",
      "ski technician": "Técnico de esquí",
      "cleaner": "Limpiador",
      "security guard": "Guardia de seguridad",
      "shop assistant": "Asistente de tienda",
      "manager": "Gerente"
    }
  }
};

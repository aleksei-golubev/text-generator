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
      "human_resources": "Recursos Humanos",
      "accountant": "Contador",
      "intern": "Becario"
    }
  },
  "park": {
    name: "Parque",
    roles: {
      "pedestrian": "Peatón",
      "dog_owner": "Dueño de perro",
      "cyclist": "Ciclista",
      "runner": "Corredor",
      "mother_with_pram": "Madre con carrito",
      "elderly_person": "Anciano",
      "young_runner": "Joven corredor",
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
      "family_member": "Miembro de la familia",
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
      "library_employee": "Empleado de biblioteca"
    }
  },
  "store": {
    name: "Tienda",
    roles: {
      "salesperson": "Dependiente",
      "customer": "Cliente",
      "cashier": "Cajero",
      "manager": "Gerente",
      "store_assistant": "Asistente de tienda",
      "stock_clerk": "Almacenista",
      "security_guard": "Guardia de seguridad",
      "cleaner": "Limpiador",
      "delivery_person": "Repartidor",
      "store_owner": "Propietario de tienda"
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
      "construction_worker": "Trabajador de construcción",
      "musician": "Músico",
      "tourist": "Turista",
      "vendor": "Vendedor",
      "delivery_person": "Repartidor"
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
  "shopping_mall": {
    name: "Centro Comercial",
    roles: {
      "salesperson": "Dependiente",
      "customer": "Cliente",
      "consultant": "Consultor",
      "security_guard": "Guardia de seguridad",
      "cashier": "Cajero",
      "manager": "Gerente",
      "cleaner": "Limpiador",
      "maintenance_worker": "Trabajador de mantenimiento",
      "child": "Niño",
      "tourist": "Turista"
    }
  },
  "cinema": {
    name: "Cine",
    roles: {
      "ticket_seller": "Vendedor de entradas",
      "viewer": "Espectador",
      "filmmaker": "Cineasta",
      "producer": "Productor",
      "director": "Director",
      "actor": "Actor",
      "sound_engineer": "Ingeniero de audio",
      "stagehand": "Ayudante de escena",
      "lighting_technician": "Iluminador",
      "security_guard": "Guardia de seguridad"
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
      "personal_trainer": "Entrenador personal",
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
      "security_guard": "Guardia de seguridad",
      "ticket_agent": "Agente de boletos",
      "ground_staff": "Personal de tierra",
      "baggage_handler": "Manipulador de equipaje",
      "customs_officer": "Oficial de aduanas",
      "airport_manager": "Gerente del aeropuerto",
      "shop_assistant": "Asistente de tienda"
    }
  },
  "university": {
    name: "Universidad",
    roles: {
      "professor": "Profesor",
      "student": "Estudiante",
      "teaching_assistant": "Asistente de enseñanza",
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
      "court_clerk": "Secretario del tribunal",
      "bailiff": "Alguacil",
      "juror": "Juradista",
      "court_reporter": "Estenógrafo",
      "defense_attorney": "Abogado defensor"
    }
  },
  "stadium": {
    name: "Estadio",
    roles: {
      "player": "Jugador",
      "coach": "Entrenador",
      "referee": "Árbitro",
      "spectator": "Espectador",
      "security_guard": "Guardia de seguridad",
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
      "beach_cleaner": "Limpiador de playa",
      "surfer": "Surfista",
      "sunbather": "Tomador de sol",
      "dog_owner": "Dueño de perro",
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
      "security_guard": "Guardia de seguridad",
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
      "animal_keeper": "Cuidador de animales",
      "vendor": "Vendedor",
      "tourist": "Turista",
      "child": "Niño",
      "gardener": "Jardinero",
      "mechanic": "Mecánico",
      "veterinarian": "Veterinario",
      "housekeeper": "Camarera"
    }
  },
  "construction_site": {
    name: "Sitio de construcción",
    roles: {
      "builder": "Constructor",
      "architect": "Arquitecto",
      "engineer": "Ingeniero",
      "foreman": "Capataz",
      "worker": "Trabajador",
      "security_guard": "Guardia de seguridad",
      "construction_manager": "Gerente de construcción",
      "truck_driver": "Conductor de camión",
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
      "animal_trainer": "Entrenador de animales",
      "scientist": "Científico",
      "vendor": "Vendedor"
    }
  },
  "airport_terminal": {
    name: "Terminal de aeropuerto",
    roles: {
      "passenger": "Pasajero",
      "ticket_agent": "Agente de boletos",
      "security_guard": "Guardia de seguridad",
      "ground_staff": "Personal de tierra",
      "baggage_handler": "Manipulador de equipaje",
      "shop_assistant": "Asistente de tienda",
      "tourist": "Turista",
      "customs_officer": "Oficial de aduanas",
      "airport_manager": "Gerente del aeropuerto",
      "guide": "Guía"
    }
  },
  "night_club": {
    name: "Club nocturno",
    roles: {
      "dj": "DJ",
      "bartender": "Barman",
      "security_guard": "Guardia de seguridad",
      "customer": "Cliente",
      "dancer": "Bailarín",
      "waiter": "Mesero",
      "manager": "Gerente",
      "host": "Anfitrión",
      "cleaner": "Limpiador",
      "musician": "Músico"
    }
  },
  "amusement_park": {
    name: "Parque de diversiones",
    roles: {
      "visitor": "Visitante",
      "ride_operator": "Operador de atracciones",
      "security_guard": "Guardia de seguridad",
      "cleaner": "Limpiador",
      "vendor": "Vendedor",
      "tourist": "Turista",
      "animator": "Animador",
      "show_performer": "Intérprete",
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
      "stock_clerk": "Almacenista",
      "security_guard": "Guardia de seguridad",
      "cleaner": "Limpiador",
      "vendor": "Vendedor",
      "delivery_person": "Repartidor",
      "meat_cutter": "Cortador de carne",
      "bakery_assistant": "Asistente de panadería"
    }
  },
  "theater": {
    name: "Teatro",
    roles: {
      "actor": "Actor",
      "director": "Director",
      "spectator": "Espectador",
      "stage_manager": "Gerente de escenario",
      "lighting_technician": "Iluminador",
      "sound_technician": "Técnico de sonido",
      "usher": "Portero",
      "costume_designer": "Diseñador de vestuario",
      "makeup_artist": "Maquillador",
      "ticket_seller": "Vendedor de entradas"
    }
  },
  "ski_resort": {
    name: "Estación de esquí",
    roles: {
      "skier": "Esquiador",
      "snowboarder": "Snowboarder",
      "instructor": "Instructor",
      "visitor": "Visitante",
      "lift_operator": "Operador de telesquí",
      "ski_technician": "Técnico de esquí",
      "cleaner": "Limpiador",
      "security_guard": "Guardia de seguridad",
      "shop_assistant": "Asistente de tienda",
      "manager": "Gerente"
    }
  }
};

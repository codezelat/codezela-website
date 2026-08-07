export type FaqItem = {
  question: string;
  answer: string;
};

type IndustryFaqProfile = {
  questionLabel?: string;
  audience: string;
  priorities: string;
  workflows: string;
  integrations: string;
  trust: string;
  international: string;
};

const industryFaqProfiles: Record<string, IndustryFaqProfile> = {
  "petroleum-and-natural-resources": {
    audience: "field teams, operations managers, suppliers, regulators, and commercial partners",
    priorities: "make asset information, operational updates, safety resources, and service capabilities easy to find without exposing sensitive internal data",
    workflows: "asset tracking, inspection records, production reporting, predictive maintenance, and environmental monitoring",
    integrations: "ERP platforms, GIS data, IoT sensors, maintenance systems, document repositories, and approved regulatory reporting tools",
    trust: "role-based access, auditable data changes, resilient infrastructure, and careful separation of public and operational systems are especially important",
    international: "multi-region operations, local units and terminology, multilingual content, regional service catalogues, and market-specific regulatory information",
  },
  "printing-and-publishing": {
    audience: "readers, authors, editors, distributors, retailers, and print customers",
    priorities: "present titles clearly, support fast catalogue discovery, simplify submissions or orders, and give publishing teams practical control over content",
    workflows: "manuscript intake, editorial approval, digital publishing, subscription management, rights metadata, print-on-demand, and fulfilment",
    integrations: "content management systems, digital asset libraries, ISBN metadata, payment gateways, email platforms, print providers, and distributor feeds",
    trust: "accessible reading experiences, copyright-aware asset handling, reliable search, fast media delivery, and structured publication metadata should be planned from the start",
    international: "multiple languages, currencies, territories, tax rules, distribution rights, publication formats, and region-specific catalogues",
  },
  "telehealth-and-telemedicine": {
    audience: "patients, clinicians, care coordinators, administrators, and authorised family members",
    priorities: "make booking, secure consultations, follow-ups, and patient guidance simple while keeping clinical information protected",
    workflows: "appointment scheduling, consent, video consultations, patient intake, prescription or referral follow-up, notifications, and care-team coordination",
    integrations: "electronic health records, identity providers, scheduling tools, secure video services, payment systems, messaging providers, and approved clinical APIs",
    trust: "privacy, informed consent, encryption, access controls, audit trails, clinical safety, accessibility, and the laws of each operating region require project-specific review",
    international: "local languages, time zones, practitioner availability, regional consent flows, data-residency decisions, and country-specific healthcare requirements",
  },
  "architecture-and-design": {
    audience: "prospective clients, architects, designers, consultants, contractors, and project stakeholders",
    priorities: "showcase work without sacrificing speed, explain services clearly, and help visitors move from inspiration to a qualified project enquiry",
    workflows: "portfolio publishing, design reviews, drawing approvals, project milestones, consultant coordination, resource planning, and client communication",
    integrations: "BIM or CAD repositories, project-management tools, digital asset libraries, CRM systems, document signing, maps, and enquiry workflows",
    trust: "high-resolution visuals need responsive delivery, descriptive alternative text, clear project credits, secure client areas, and a mobile experience that remains fast",
    international: "multilingual portfolios, regional service pages, local measurement units, distributed project teams, and market-specific planning or procurement information",
  },
  "advertising-and-marketing": {
    audience: "prospective clients, campaign teams, account managers, creators, and marketing leaders",
    priorities: "communicate positioning quickly, prove capabilities with useful work examples, and turn interest into measurable enquiries",
    workflows: "campaign briefs, content approvals, asset production, publishing calendars, lead capture, attribution, client reporting, and performance analysis",
    integrations: "CRM, analytics, advertising platforms, marketing automation, social publishing, consent management, data warehouses, and reporting dashboards",
    trust: "consent-aware tracking, accurate case-study claims, accessible creative, fast landing pages, and transparent data handling protect both performance and credibility",
    international: "regional campaigns, multiple languages, market-specific offers, local privacy choices, distributed approvals, and consolidated cross-market reporting",
  },
  "event-planning-and-management": {
    audience: "attendees, organisers, speakers, exhibitors, sponsors, vendors, and venue teams",
    priorities: "make event discovery, registration, schedules, updates, and support effortless before, during, and after the event",
    workflows: "ticketing, registration, attendee check-in, agenda management, speaker submissions, vendor coordination, notifications, feedback, and reporting",
    integrations: "payment gateways, CRM and email tools, badge or QR systems, calendar services, streaming platforms, venue maps, and analytics",
    trust: "traffic spikes, payment security, accessible booking, clear refund information, resilient check-in, and privacy-conscious attendee data handling need early planning",
    international: "time zones, currencies, languages, tax rules, travel information, hybrid attendance, and regional ticket or consent requirements",
  },
  "health-and-wellness": {
    audience: "clients, practitioners, coaches, members, front-desk teams, and service managers",
    priorities: "explain services responsibly, simplify booking and payments, and give clients a calm, accessible path to the right programme or practitioner",
    workflows: "appointments, memberships, class capacity, intake forms, reminders, virtual sessions, client communication, and service follow-up",
    integrations: "scheduling systems, payment gateways, membership platforms, video consultation tools, CRM, email or SMS providers, and analytics",
    trust: "privacy, accessible content, secure accounts, accurate wellness claims, clear consent, and a strict boundary between general information and medical advice are essential",
    international: "regional service availability, languages, currencies, time zones, local terms, and privacy or consumer-protection requirements",
  },
  "financial-technology-fintech": {
    audience: "consumers, merchants, operations teams, compliance staff, partners, and financial institutions",
    priorities: "make complex financial journeys understandable, reduce friction in onboarding and transactions, and build visible trust at every step",
    workflows: "identity verification, account onboarding, payments, lending, reconciliation, risk review, fraud alerts, customer support, and regulatory reporting",
    integrations: "banking APIs, payment processors, identity and KYC providers, fraud systems, ledgers, credit services, notification tools, and analytics",
    trust: "secure-by-design architecture, strong authentication, encryption, auditability, fraud controls, accessibility, and jurisdiction-specific financial review cannot be treated as optional add-ons",
    international: "multiple currencies, languages, payment rails, identity methods, data-residency rules, risk policies, and country-specific financial regulations",
  },
  "environmental-and-sustainability": {
    audience: "sustainability teams, operations leaders, suppliers, auditors, investors, regulators, and the public",
    priorities: "turn complex environmental information into credible, understandable evidence and make progress or services easy to explore",
    workflows: "energy and resource monitoring, emissions calculation, waste tracking, supplier data collection, target management, evidence review, and reporting",
    integrations: "IoT meters, utility data, ERP systems, supplier portals, GIS tools, carbon-accounting platforms, document stores, and business-intelligence tools",
    trust: "methodologies, data sources, reporting periods, approvals, and revisions should be traceable so sustainability claims remain transparent and defensible",
    international: "regional reporting frameworks, units, languages, facility hierarchies, emissions factors, and market-specific disclosure requirements",
  },
  "transportation-and-logistics": {
    audience: "dispatchers, drivers, warehouse teams, customers, partners, and operations managers",
    priorities: "provide clear service information, reliable shipment visibility, quick support, and a consistent experience across desktop and mobile devices",
    workflows: "dispatch, route planning, fleet maintenance, driver updates, proof of delivery, shipment tracking, exception handling, and customer notifications",
    integrations: "transport management systems, GPS and telematics, warehouse platforms, carrier APIs, mapping services, ERP, barcode tools, and payment systems",
    trust: "accurate status data, resilient mobile flows, role-based access, location-data privacy, secure partner connections, and graceful handling of weak connectivity matter",
    international: "cross-border routes, languages, time zones, address formats, carrier networks, customs documents, currencies, and regional service rules",
  },
  "arts-and-creative-industries": {
    audience: "artists, collectors, commissioners, venues, collaborators, agencies, and cultural audiences",
    priorities: "let the work lead visually while keeping portfolios fast, discoverable, accessible, and easy for creators to update",
    workflows: "portfolio management, commissions, event listings, licensing enquiries, digital sales, memberships, submissions, and collaborator approvals",
    integrations: "digital asset libraries, e-commerce, ticketing, CRM, newsletter tools, social platforms, rights metadata, and print or fulfilment partners",
    trust: "image quality, creator attribution, copyright and licensing information, accessible media, secure commerce, and performance on mobile deserve equal attention",
    international: "multilingual portfolios, global payments, currencies, shipping regions, rights territories, time zones, and culturally appropriate presentation",
  },
  "gaming-and-esports": {
    audience: "players, teams, tournament organisers, fans, sponsors, moderators, and content partners",
    priorities: "make events, teams, results, community content, and participation paths fast and clear across gaming-focused devices",
    workflows: "player registration, team management, brackets, scheduling, live scores, moderation, rewards, content publishing, and sponsor reporting",
    integrations: "game or tournament APIs, identity providers, streaming platforms, community tools, payments, anti-abuse services, analytics, and notification systems",
    trust: "account security, fair-play controls, moderation, age-appropriate experiences, low-latency interactions, privacy, and traffic-spike resilience require deliberate design",
    international: "regional servers, languages, time zones, currencies, age requirements, tournament rules, and globally distributed communities",
  },
  "startups-and-entrepreneurs": {
    audience: "early customers, founders, internal teams, investors, partners, and future hires",
    priorities: "validate the core proposition quickly, focus the first release on essential user outcomes, and leave a maintainable path for growth",
    workflows: "customer onboarding, subscriptions, marketplace activity, internal operations, feedback collection, product analytics, support, and investor reporting",
    integrations: "payments, authentication, CRM, analytics, communication tools, cloud services, automation platforms, and the startup’s existing operational stack",
    trust: "clear scope, secure foundations, accessible UX, performance budgets, reliable analytics, ownership of code and data, and realistic launch criteria reduce avoidable rework",
    international: "multiple markets, currencies, languages, pricing models, tax requirements, data locations, and staged regional launches",
  },
  "luxury-goods-and-jewellery": {
    audience: "collectors, gift buyers, retail clients, private customers, sales advisers, and trade partners",
    priorities: "pair premium visual storytelling with fast product discovery, trustworthy detail, and a discreet path to purchase or private enquiry",
    workflows: "catalogue management, appointments, product enquiries, clienteling, inventory visibility, authentication records, fulfilment, and after-sales care",
    integrations: "e-commerce, CRM, appointment booking, inventory or ERP systems, payments, shipping, product information management, and marketing automation",
    trust: "accurate materials and sizing information, high-quality imagery, secure payments, fraud controls, provenance handling, privacy, and refined mobile performance build confidence",
    international: "currencies, languages, tax and duty information, insured shipping regions, market-specific collections, appointments, and cross-border customer care",
  },
  "retail-and-wholesale-distribution": {
    audience: "consumers, trade buyers, sales teams, warehouse staff, distributors, and account managers",
    priorities: "make products easy to find, show the right pricing and availability, and streamline both retail checkout and wholesale ordering",
    workflows: "catalogue management, trade accounts, quotations, bulk ordering, inventory, fulfilment, returns, promotions, and sales reporting",
    integrations: "ERP, point of sale, warehouse systems, product information management, CRM, payments, shipping carriers, marketplaces, and accounting tools",
    trust: "accurate stock and pricing, secure accounts, accessible checkout, reliable order status, tax handling, and performance across large catalogues are foundational",
    international: "currencies, tax rules, units, languages, regional catalogues, distributor territories, shipping options, and market-specific price lists",
  },
  "consumer-electronics": {
    audience: "buyers, retailers, distributors, support teams, installers, and product managers",
    priorities: "explain specifications clearly, support product comparison, surface compatibility information, and connect customers with sales and support",
    workflows: "product launches, catalogue updates, warranty registration, support tickets, firmware or documentation delivery, dealer enquiries, and inventory coordination",
    integrations: "product information management, ERP, e-commerce, CRM, warranty systems, support platforms, dealer portals, analytics, and connected-device services",
    trust: "accurate technical data, secure device or account connections, accessible documentation, privacy, vulnerability-response information, and fast global asset delivery matter",
    international: "regional models, voltage or connectivity variants, languages, warranty terms, dealer networks, currencies, regulations, and support content",
  },
  "aerospace-and-defence": {
    audience: "authorised teams, suppliers, programme stakeholders, procurement staff, and approved public audiences",
    priorities: "communicate capabilities and approved information clearly while keeping controlled operational or programme data strictly separated",
    workflows: "supplier qualification, controlled documents, maintenance records, programme milestones, quality reviews, training, inventory, and authorised reporting",
    integrations: "approved ERP and maintenance systems, document-control platforms, identity providers, supplier portals, asset systems, and secure analytics environments",
    trust: "data classification, least-privilege access, audit trails, secure hosting, supply-chain controls, accessibility, and applicable export or procurement rules require specialist review",
    international: "approved multinational programmes, regional access policies, languages, supplier networks, data-location constraints, and jurisdiction-specific controls",
  },
  "professional-services-consulting-legal-accounting": {
    questionLabel: "consulting, legal, and accounting services",
    audience: "prospective clients, existing clients, partners, consultants, legal teams, accountants, and support staff",
    priorities: "explain expertise plainly, establish credibility, make the right professional easy to find, and turn enquiries into a well-managed intake process",
    workflows: "client intake, conflict or eligibility checks, appointments, proposals, document exchange, matter or engagement updates, billing, and knowledge publishing",
    integrations: "CRM, practice-management software, accounting tools, calendars, secure document portals, e-signature, payments, and marketing automation",
    trust: "confidentiality, secure document handling, clear professional disclaimers, accessible information, retention controls, and jurisdiction-specific obligations are central",
    international: "regional service descriptions, languages, currencies, office locations, professional jurisdictions, privacy rules, and cross-border client collaboration",
  },
  "pharmaceuticals-and-biotechnology": {
    audience: "research teams, healthcare professionals, partners, trial stakeholders, investors, and authorised public audiences",
    priorities: "present scientific information accurately, separate audiences clearly, and make approved resources, programmes, and contact paths easy to navigate",
    workflows: "research data capture, study operations, document review, quality processes, partner collaboration, safety reporting, training, and approved content publishing",
    integrations: "laboratory systems, clinical platforms, document management, identity providers, quality systems, regulatory repositories, analytics, and approved data services",
    trust: "validated workflows, auditability, controlled content, privacy, security, accessibility, scientific review, and region-specific regulatory requirements need specialist governance",
    international: "languages, trial or programme regions, data-residency decisions, approved product information, time zones, and market-specific regulatory content",
  },
  "sports-and-fitness": {
    audience: "members, athletes, coaches, fans, class participants, club staff, and event organisers",
    priorities: "make programmes, schedules, bookings, memberships, results, and community information easy to use on mobile",
    workflows: "member onboarding, class booking, attendance, coaching plans, subscriptions, event registration, performance tracking, and notifications",
    integrations: "booking and membership systems, payments, wearable or activity APIs, CRM, access control, streaming, event platforms, and communication tools",
    trust: "secure member data, accessible booking, reliable payments, age-appropriate controls, clear health disclaimers, and fast real-time updates are important",
    international: "languages, currencies, time zones, regional programmes, competition rules, membership models, and distributed communities",
  },
  "fashion-and-apparel": {
    audience: "shoppers, wholesale buyers, stylists, retail teams, suppliers, and brand communities",
    priorities: "combine distinctive brand storytelling with fast product discovery, useful sizing, confident checkout, and easy collection management",
    workflows: "catalogue and collection launches, inventory, variants, wholesale accounts, promotions, orders, returns, fulfilment, and customer communication",
    integrations: "e-commerce, ERP, point of sale, product information management, CRM, payments, shipping, marketplaces, and social commerce",
    trust: "accurate sizing and material details, inclusive and accessible imagery, secure checkout, stock accuracy, returns clarity, and responsive image performance reduce uncertainty",
    international: "currencies, languages, size conversions, duties, regional catalogues, shipping zones, payment methods, and market-specific campaigns",
  },
  "human-resources-and-staffing": {
    audience: "candidates, employees, recruiters, hiring managers, clients, and HR operations teams",
    priorities: "make roles and services easy to understand, reduce friction in applications, and protect personal information throughout the employment journey",
    workflows: "vacancy publishing, applications, screening, interview scheduling, onboarding, document collection, time or leave management, and client reporting",
    integrations: "applicant tracking, HRIS, payroll, calendars, identity checks, e-signature, job boards, communication tools, and analytics",
    trust: "candidate privacy, consent, role-based access, retention rules, accessibility, bias-aware workflows, auditability, and secure document handling need careful design",
    international: "languages, time zones, regional job boards, currencies, local employment processes, data rules, and country-specific application fields",
  },
  "construction-and-engineering": {
    audience: "clients, project managers, engineers, contractors, site teams, consultants, and suppliers",
    priorities: "present capabilities and completed work clearly while giving project teams reliable access to the information and actions they need",
    workflows: "tenders, drawing and document control, RFIs, approvals, site reporting, resource planning, progress tracking, safety records, and handover",
    integrations: "BIM and common data environments, ERP, project-management tools, GIS, document control, procurement systems, accounting, and field apps",
    trust: "version control, permissions, audit trails, offline-friendly field use, secure document sharing, accessibility, and dependable large-file delivery are essential",
    international: "regional project teams, languages, measurement units, currencies, contract structures, supplier networks, and local standards",
  },
  "technology-and-software-development": {
    audience: "prospective customers, product users, developers, technical buyers, partners, and support teams",
    priorities: "explain the product or service quickly, document technical value credibly, and create a direct path to trial, demo, purchase, or support",
    workflows: "user onboarding, subscriptions, product documentation, release communication, support, partner management, usage analytics, and internal administration",
    integrations: "identity, cloud infrastructure, payments, CRM, analytics, developer APIs, support tools, communication platforms, and CI or observability systems",
    trust: "secure architecture, reliable authentication, transparent status and privacy information, accessible interfaces, strong performance, and maintainable code support long-term confidence",
    international: "languages, currencies, data locations, regional pricing, distributed infrastructure, support hours, and multi-market product configuration",
  },
  "food-and-beverage": {
    audience: "diners, retail buyers, distributors, venue teams, franchisees, suppliers, and operations managers",
    priorities: "make products or menus appealing and easy to navigate while simplifying ordering, reservations, enquiries, and location discovery",
    workflows: "menu or catalogue updates, reservations, online orders, inventory, supplier coordination, loyalty, promotions, delivery, and food-safety records",
    integrations: "point of sale, e-commerce, delivery services, reservation tools, inventory or ERP, payments, CRM, maps, and accounting",
    trust: "accurate allergen and ingredient information, secure payments, accessible menus, location accuracy, stock visibility, and reliable peak-time performance matter",
    international: "languages, currencies, regional menus, dietary information, taxes, franchise locations, delivery coverage, and market-specific promotions",
  },
  "agriculture-and-farming": {
    audience: "farmers, agronomists, field teams, buyers, suppliers, cooperatives, and operations managers",
    priorities: "deliver useful information in field conditions, simplify access to products or services, and turn operational data into timely decisions",
    workflows: "crop planning, irrigation, input management, field scouting, equipment maintenance, harvest records, traceability, inventory, and market coordination",
    integrations: "weather and satellite data, IoT sensors, farm-management systems, GIS, equipment platforms, ERP, marketplace tools, and mobile notifications",
    trust: "offline-capable mobile use, data ownership, sensor reliability, secure access, clear recommendations, accessible interfaces, and practical support for low-bandwidth areas are key",
    international: "local languages, units, crop calendars, climates, currencies, supply chains, regional practices, and market or traceability requirements",
  },
  "non-profit-and-government": {
    audience: "citizens, service users, donors, volunteers, staff, partners, and public stakeholders",
    priorities: "make services and information easy to find, support inclusive participation, and communicate impact or public decisions transparently",
    workflows: "service applications, donations, grants, volunteer management, case intake, public consultations, document publishing, reporting, and stakeholder communication",
    integrations: "identity services, payment or donation tools, case-management systems, CRM, document repositories, maps, notification services, and open-data platforms",
    trust: "accessibility, plain language, privacy, records management, security, auditability, transparent governance, and procurement or public-sector requirements deserve early attention",
    international: "languages, regional programmes, currencies, local offices, cross-border donors, data-location rules, and country-specific public-service requirements",
  },
  "energy-and-utilities": {
    audience: "customers, field teams, operators, contractors, regulators, and commercial partners",
    priorities: "make service information, account actions, outage updates, and support reliable while separating public services from sensitive operational systems",
    workflows: "metering, billing, outage communication, field service, asset maintenance, demand monitoring, customer requests, and regulatory reporting",
    integrations: "meter and IoT platforms, billing and CRM, GIS, outage management, ERP, payment gateways, field-service systems, and analytics",
    trust: "critical-infrastructure boundaries, strong access controls, auditability, resilient service, privacy, accessible emergency information, and regional regulatory review are vital",
    international: "regional grids or service areas, languages, tariffs, units, currencies, customer rules, data-residency needs, and market-specific regulation",
  },
  "media-and-entertainment": {
    audience: "viewers, listeners, readers, creators, subscribers, advertisers, and content teams",
    priorities: "make content easy to discover, fast to play or read, and straightforward to subscribe to or support across devices",
    workflows: "content ingestion, editorial approval, scheduling, streaming, subscriptions, rights management, advertising, audience engagement, and analytics",
    integrations: "content and digital asset management, streaming or CDN services, payments, ad platforms, identity, recommendations, rights metadata, and analytics",
    trust: "content rights, age controls, privacy, accessible media, resilient playback, secure accounts, transparent subscriptions, and performance under traffic peaks matter",
    international: "languages, subtitles, currencies, rights territories, regional catalogues, time zones, pricing, and market-specific content policies",
  },
  telecommunications: {
    audience: "consumers, enterprise customers, agents, network teams, partners, and support staff",
    priorities: "make plans and coverage understandable, simplify onboarding and account service, and provide dependable support across devices",
    workflows: "plan comparison, customer onboarding, provisioning, billing, usage visibility, fault reporting, field service, support, and partner management",
    integrations: "billing and CRM, identity checks, network inventory, provisioning, payments, mapping, support platforms, notification systems, and analytics",
    trust: "high availability, account security, privacy, accessible self-service, accurate coverage information, fraud controls, and safe boundaries around network operations are essential",
    international: "languages, currencies, regional plans, roaming, numbering formats, partner networks, data rules, and country-specific telecommunications requirements",
  },
  "automotive-and-transportation": {
    audience: "vehicle buyers, owners, fleet customers, dealers, service teams, manufacturers, and mobility partners",
    priorities: "make vehicles or services easy to compare, simplify bookings and enquiries, and support the ownership or transport journey after conversion",
    workflows: "inventory publishing, test-drive or service booking, quotations, fleet management, maintenance, parts, customer communication, and mobility reservations",
    integrations: "dealer or fleet systems, CRM, inventory, payments, maps, telematics, service scheduling, finance providers, and marketing platforms",
    trust: "accurate specifications and availability, secure account and vehicle data, accessible booking, clear finance information, location privacy, and strong mobile performance build confidence",
    international: "regional models, languages, currencies, units, dealer networks, road or transport rules, service coverage, and market-specific finance options",
  },
  "insurance-and-legal": {
    audience: "policyholders, claimants, clients, advisers, lawyers, case teams, and operations staff",
    priorities: "turn complex services into clear journeys, support secure document exchange, and give users visibility without exposing confidential information",
    workflows: "quotes or intake, eligibility checks, claims or matter onboarding, document collection, appointments, status updates, billing, and reporting",
    integrations: "policy or practice-management systems, CRM, identity verification, payments, e-signature, secure documents, calendars, and communication tools",
    trust: "confidentiality, strong identity and access controls, audit trails, retention, accessibility, transparent terms, and jurisdiction-specific professional or insurance rules are central",
    international: "languages, currencies, policy regions, professional jurisdictions, regional documents, privacy rules, and cross-border case or claims collaboration",
  },
  "logistics-and-supply-chain": {
    audience: "shippers, suppliers, warehouse teams, carriers, buyers, customers, and supply-chain managers",
    priorities: "create reliable end-to-end visibility, make exceptions actionable, and give every authorised party the right information at the right time",
    workflows: "procurement, inventory, warehousing, transport booking, shipment milestones, customs documents, proof of delivery, exceptions, and supplier performance",
    integrations: "ERP, warehouse and transport systems, carrier APIs, EDI, IoT tracking, customs services, mapping, procurement tools, and analytics",
    trust: "data accuracy, partner permissions, secure integrations, resilient event processing, traceability, privacy, and usable mobile workflows are critical",
    international: "cross-border lanes, languages, currencies, time zones, customs data, units, carrier networks, supplier regions, and trade requirements",
  },
  "travel-and-hospitality": {
    audience: "travellers, guests, agents, property teams, tour operators, and customer-service staff",
    priorities: "inspire confident booking, show availability and inclusions clearly, and support guests before, during, and after their trip",
    workflows: "search and availability, reservations, payments, itinerary management, check-in, guest messaging, loyalty, reviews, and operations",
    integrations: "property or reservation systems, channel managers, payments, maps, CRM, airline or activity APIs, messaging, and analytics",
    trust: "accurate availability and pricing, secure payments, accessible booking, transparent cancellation terms, privacy, and dependable peak-season performance are essential",
    international: "languages, currencies, time zones, tax rules, regional inventory, payment methods, travel documents, and local guest information",
  },
  "manufacturing-and-industrial": {
    audience: "buyers, engineers, distributors, operators, maintenance teams, suppliers, and plant managers",
    priorities: "explain technical capabilities clearly, make products and documentation easy to find, and connect commercial enquiries with operational data where appropriate",
    workflows: "product configuration, quotations, production planning, quality checks, maintenance, inventory, supplier coordination, traceability, and reporting",
    integrations: "ERP, manufacturing execution systems, product information management, IoT equipment, maintenance platforms, CRM, supplier portals, and analytics",
    trust: "accurate technical data, controlled documentation, role-based access, auditability, resilient shop-floor use, security, and clear separation of public and plant systems matter",
    international: "languages, currencies, units, regional product catalogues, distributor networks, technical standards, supply chains, and market-specific documentation",
  },
  "real-estate-and-property-management": {
    audience: "buyers, tenants, owners, investors, agents, property managers, and maintenance teams",
    priorities: "make properties easy to discover, provide complete and current details, and turn enquiries, applications, or service requests into clear workflows",
    workflows: "listing management, search, viewings, applications, tenant onboarding, rent or fee payments, maintenance, documents, and owner reporting",
    integrations: "property-management systems, CRM, maps, listing portals, payments, identity checks, e-signature, accounting, and communication tools",
    trust: "accurate availability, privacy, secure documents and payments, accessible search, permissions, transparent fees, and careful handling of applicant data build confidence",
    international: "languages, currencies, area units, regional listing fields, property laws, tax information, office locations, and cross-border investor journeys",
  },
  "education-and-elearning": {
    audience: "learners, parents, educators, administrators, employers, and education partners",
    priorities: "make programmes easy to compare, remove friction from enrolment, and give learners an accessible, motivating path through content and support",
    workflows: "course publishing, enrolment, payments, learning delivery, assignments, assessments, progress tracking, certificates, communication, and reporting",
    integrations: "learning management systems, student information systems, video, payments, identity, email, assessment tools, CRM, and analytics",
    trust: "learner privacy, secure content, accessibility, age-appropriate controls, reliable progress records, clear credentials, and low-bandwidth performance require careful planning",
    international: "languages, time zones, currencies, local curricula, regional qualifications, distributed instructors, and market-specific enrolment requirements",
  },
  "healthcare-and-medical": {
    audience: "patients, clinicians, care teams, administrators, partners, and authorised family members",
    priorities: "help people find appropriate services, book or request care, access trustworthy information, and complete necessary steps without unnecessary friction",
    workflows: "patient intake, appointments, referrals, clinical communication, records access, billing, follow-up, staff coordination, and approved information publishing",
    integrations: "electronic health records, scheduling, identity, payments, laboratories, imaging, secure messaging, video, and approved healthcare APIs",
    trust: "privacy, security, consent, accessibility, clinical safety, audit trails, data governance, and the healthcare rules of each operating region require specialist review",
    international: "languages, time zones, regional services, practitioner availability, data-residency decisions, consent, and country-specific healthcare requirements",
  },
  "ecommerce-and-retail": {
    audience: "shoppers, store teams, customer-service staff, suppliers, and marketplace partners",
    priorities: "make products easy to discover and compare, reduce checkout friction, and provide clear delivery, returns, and support information",
    workflows: "catalogue and pricing, inventory, promotions, checkout, payments, fulfilment, returns, customer service, loyalty, and marketplace operations",
    integrations: "ERP, product information management, point of sale, payments, shipping, CRM, marketplaces, tax services, and analytics",
    trust: "secure and accessible checkout, accurate stock and pricing, clear policies, fraud controls, privacy, structured product data, and fast mobile performance directly affect confidence",
    international: "currencies, languages, tax and duty rules, payment methods, shipping zones, regional catalogues, units, and localisation of promotions and policies",
  },
  "finance-and-banking": {
    audience: "customers, relationship teams, operations staff, compliance teams, merchants, and financial partners",
    priorities: "make products understandable, simplify secure account journeys, and give customers reliable self-service without weakening financial controls",
    workflows: "onboarding, identity checks, account servicing, payments, transfers, lending, reconciliation, fraud review, support, and regulatory reporting",
    integrations: "core banking, payment rails, identity and KYC providers, CRM, fraud systems, credit services, document platforms, and analytics",
    trust: "secure architecture, strong authentication, encryption, auditability, accessibility, fraud controls, resilience, and jurisdiction-specific financial review are mandatory design concerns",
    international: "currencies, languages, payment rails, regional products, identity methods, data locations, risk policies, and country-specific banking requirements",
  },
};

export const industriesPageFaqs: readonly FaqItem[] = [
  {
    question: "Which industries does Codezela build websites and custom software for?",
    answer:
      "Codezela works across finance, healthcare, education, e-commerce, logistics, manufacturing, professional services, travel, media, government, and many other sectors shown on this page. The solution is shaped around the organisation’s users, workflows, systems, risk level, and target markets rather than applying one generic industry template.",
  },
  {
    question: "Can Codezela develop a digital platform for a niche or highly regulated industry?",
    answer:
      "Yes, subject to a discovery and feasibility review. Codezela can design for specialised workflows and work with a client’s legal, security, compliance, or domain experts. Where formal approval or certification is required, the applicable authority and qualified specialists remain part of the validation process; a website build alone is never presented as automatic compliance.",
  },
  {
    question: "How do you decide between a website, customer portal, mobile app, or custom platform?",
    answer:
      "The choice starts with the job users need to complete, how often they will use it, whether they need device features or offline access, what data is involved, and which business systems must connect. A public website may solve discovery and lead generation, while authenticated workflows, field operations, or recurring transactions may justify a portal, app, or custom platform.",
  },
  {
    question: "Can a new industry solution integrate with our existing business systems?",
    answer:
      "Often, yes. Codezela can assess supported APIs or connectors for systems such as CRM, ERP, payments, identity, analytics, inventory, booking, learning, or document management. Integration scope should include data ownership, permissions, failure handling, audit needs, vendor limits, migration, and a safe fallback when an external service is unavailable.",
  },
  {
    question: "How are security, accessibility, performance, and SEO handled across industries?",
    answer:
      "They are treated as project requirements from the beginning. The exact controls vary by audience and risk, but planning can include secure architecture, least-privilege access, privacy-conscious data flows, keyboard and assistive-technology support, responsive performance budgets, semantic content, crawlable pages, and clear metadata. Regulated sectors also need requirements reviewed against the rules of each target market.",
  },
  {
    question: "Can Codezela support international organisations and multi-market platforms?",
    answer:
      "A solution can be designed for multiple languages, currencies, time zones, locations, content regions, and market-specific journeys. During discovery, Codezela identifies target countries, localisation depth, data-residency needs, payment or tax differences, regional policies, and the content ownership process so international support is built into the architecture rather than added as an afterthought.",
  },
];

export function getIndustryFaqs(slug: string, title: string): readonly FaqItem[] {
  const profile = industryFaqProfiles[slug];

  if (!profile) {
    throw new Error(`Missing industry FAQ profile for: ${slug}`);
  }

  const questionLabel = profile.questionLabel ?? title;

  return [
    {
      question: `What should web development for ${questionLabel} prioritise?`,
      answer: `Effective web development for ${title} starts with the needs of ${profile.audience}. The website or platform should ${profile.priorities}. Discovery should confirm the highest-value user journeys, content owners, technical constraints, and measurable business outcomes before features are selected.`,
    },
    {
      question: `Which ${questionLabel} workflows and systems can custom software connect?`,
      answer: `A tailored solution can support ${profile.workflows}. Where existing products provide secure, supported integration methods, relevant connections may include ${profile.integrations}. Planning should also cover permissions, data ownership, error recovery, vendor limits, audit needs, and a phased roadmap based on the highest-value user or operational problem.`,
    },
    {
      question: `How do you handle security, accessibility, performance, and SEO for ${questionLabel} websites?`,
      answer: `For ${title}, ${profile.trust}. Codezela also plans semantic and crawlable content, keyboard and assistive-technology support, responsive layouts, efficient media, measurable performance budgets, and clear metadata. Any formal compliance requirement is validated against the client’s target region and qualified domain guidance rather than assumed from a generic checklist.`,
    },
    {
      question: `Can ${questionLabel} software support international operations?`,
      answer: `Yes. It can be designed for ${profile.international}. The architecture should confirm target countries, localisation ownership, legal and privacy requirements, support coverage, and regional data or integration constraints early so expansion does not depend on rebuilding the core experience.`,
    },
  ];
}

type PortfolioFaqProfile = {
  client: string;
  projectType: string;
  goal: string;
  capabilities: string;
  delivery: string;
  lesson: string;
};

const portfolioFaqProfiles: Record<string, PortfolioFaqProfile> = {
  "evergreen-lighting": {
    client: "Evergreen Lighting Malaysia",
    projectType: "industrial product catalogue website",
    goal: "showcase a broad range of indoor, outdoor, stage, decorative, custom, and sensor lighting products while making product-specific enquiries straightforward",
    capabilities: "a structured lighting catalogue, clear category navigation, responsive browsing, and enquiry actions connected to individual products",
    delivery: "the information architecture was organised around product discovery, then a clean responsive interface and streamlined catalogue enquiry flow were implemented and performance-tuned",
    lesson: "a strong industrial catalogue needs clear product taxonomy, useful specifications, dependable mobile performance, an easy content-maintenance process, and enquiry context that tells the sales team which product interested the visitor",
  },
  "ceylon-eco": {
    client: "Ceylon Eco Spices",
    projectType: "spice catalogue and bulk-ordering website",
    goal: "present its premium spice range clearly and let customers place bulk orders through an intuitive digital journey",
    capabilities: "a detailed product catalogue, product descriptions, a bulk-ordering flow, simple navigation, and a responsive interface across devices",
    delivery: "the site structure prioritised catalogue clarity and ordering usability, with a visual design that highlighted the products before the responsive catalogue and ordering features were developed and performance-optimised",
    lesson: "B2B food-product websites work best when product information, pack or order requirements, enquiry or ordering steps, mobile usability, and internal fulfilment responsibilities are defined together",
  },
  "smart-network-earning": {
    client: "Smart Network Earning Solutions",
    projectType: "job-listing and application platform",
    goal: "publish opportunities, let applicants purchase application credits, and make the application process usable for people across age groups",
    capabilities: "job discovery, application-credit purchasing, application submission, a responsive interface, and a custom dashboard for managing applicants and applications",
    delivery: "wireframes and competitor research informed a clean application journey, after which the purchasing, submission, and administration features were implemented and optimised",
    lesson: "a recruitment platform should make fees and eligibility clear, minimise form friction, protect applicant data, support accessible mobile use, and give administrators an auditable way to manage application status",
  },
  "saumika-senanayake": {
    client: "Saumika Senanayake",
    projectType: "learning management system",
    goal: "give students access to recordings and live sessions after the relevant monthly or module payment while keeping course administration manageable",
    capabilities: "student registration and management, course and lesson administration, secure media access, payment-linked learning access, and a responsive learner interface",
    delivery: "requirements and brand discovery were translated into a structured learner journey and a responsive interface designed around course access, student management, and protected learning content",
    lesson: "a tuition LMS should define enrolment rules, payment periods, content permissions, secure video delivery, progress records, support processes, and low-friction mobile access before implementation",
  },
  "photolamp-ecommerce": {
    client: "Photolamp",
    projectType: "customisable Shopify store",
    goal: "sell personalised lamps and gifts online while allowing shoppers to upload an image and configure a product before purchase",
    capabilities: "Shopify commerce, product customisation, customer image uploads, a third-party product-design integration, responsive storefront design, and a tested purchase flow",
    delivery: "the storefront structure and theme were tailored to the brand, then a specialist customisation service was integrated and the complete configuration-to-purchase journey was tested and optimised",
    lesson: "personalised-product commerce needs clear previews and upload rules, mobile-friendly editing, validation of custom options, reliable transfer of configuration data into the order, and thorough checkout testing",
  },
  "smarit-academy": {
    client: "Smart IT Academy",
    projectType: "e-learning and course-commerce platform",
    goal: "sell digital courses, protect learner access, and give the academy a manageable system for courses, lessons, students, payments, and completion certificates",
    capabilities: "an LMS, e-commerce and payment gateways, secure course access, course administration, responsive learner journeys, and automated certificate generation",
    delivery: "the team combined brand-led interface design with parallel front-end and back-end development for course commerce, content access, administration, and certificate workflows",
    lesson: "an academy platform should connect payment status to access rules, define certificate eligibility, make course operations manageable, protect learning media, and remain accessible on the devices students actually use",
  },
  "tharusha-san": {
    client: "Tharusha San",
    projectType: "creative portfolio website",
    goal: "promote a brand-identity design practice and present portfolio work through a distinctive but easy-to-manage online experience",
    capabilities: "a visual portfolio, creative responsive UI, project presentation, and a custom dashboard for maintaining portfolio items",
    delivery: "wireframing and competitor research shaped a brand-appropriate interface, while front-end and back-end work delivered the responsive presentation and portfolio-management capability",
    lesson: "a creative portfolio should let the work lead, load imagery efficiently, explain each project clearly, provide accessible navigation, and give the owner a simple publishing workflow that preserves visual consistency",
  },
  "tech-shorts": {
    client: "Tech Shorts",
    projectType: "technology news and blogging platform",
    goal: "publish technology articles through a WordPress site with a controlled editorial approval process",
    capabilities: "blog publishing, article review and approval, post management, a responsive interactive interface, and search-friendly content structure",
    delivery: "the information architecture and modern interface were established first, then dashboard controls were added to support editorial review and post management before performance and on-site SEO work",
    lesson: "a news platform needs clear topic architecture, author and approval roles, consistent metadata, fast article templates, internal linking, accessible media, and an editorial workflow that prevents unreviewed content from going live",
  },
  "viduvin-holdings": {
    client: "Viduvin Holdings",
    projectType: "corporate website",
    goal: "establish a professional online presence, increase brand awareness, and give the company a place to publish updates",
    capabilities: "clear corporate presentation, update publishing, responsive layouts, and a clean user experience aligned with the brand",
    delivery: "discovery, wireframing, competitor research, and UI review led into a custom responsive build with performance and on-site SEO optimisation",
    lesson: "a corporate site should make the organisation, services, evidence, locations, and contact routes immediately understandable while assigning clear ownership for ongoing updates and enquiries",
  },
  "sitc-campus": {
    client: "SITC Campus",
    projectType: "education and course website",
    goal: "increase campus visibility and make available courses and diplomas easy for prospective learners to discover",
    capabilities: "responsive programme presentation, manageable course and diploma content, professional brand design, and search-friendly page structure",
    delivery: "wireframes and research guided a campus-specific interface, followed by a responsive build and editable programme capability with performance and local search optimisation",
    lesson: "an education website should give every programme a clear page with entry information, outcomes, delivery details, dates or enquiry routes, accessible mobile content, and a publishing process that keeps course facts current",
  },
  "xpara-gen": {
    client: "XParaGen",
    projectType: "global creative-agency portfolio website",
    goal: "build brand awareness and present the NFT agency’s work to an international client audience",
    capabilities: "custom portfolio management, rich project presentation, an interactive responsive interface, and on-site SEO and performance optimisation",
    delivery: "brand discovery, wireframing, UI refinement, and parallel front-end and back-end development produced a tailored visual experience and manageable portfolio system",
    lesson: "an internationally focused agency site should balance visual character with fast media, clear service language, project context, accessible interactions, simple content operations, and localisation readiness",
  },
  "pixel-design-portfolio": {
    client: "Pixel Design Co.",
    projectType: "low-maintenance design portfolio",
    goal: "showcase graphic-design work through a minimal responsive website that could be updated without specialist technical knowledge",
    capabilities: "an easily managed portfolio, responsive minimal presentation, and a cost-conscious publishing workflow built around Notion and Super.so",
    delivery: "the content structure and interface were planned around the brand while Notion was configured as the content back end and connected to the public experience through Super.so",
    lesson: "a lightweight portfolio can be effective when the content model, image standards, domain setup, accessibility, platform limits, backups, and the owner’s publishing routine are agreed before choosing a no-code stack",
  },
  "donate-srilanka": {
    client: "Donate SriLanka",
    projectType: "nonprofit cryptocurrency fundraising website",
    goal: "explain the community initiative to a worldwide audience and provide a simple way to support it with cryptocurrency donations",
    capabilities: "a concise information journey, responsive presentation, and cryptocurrency donation support through both Lightning Network and mainnet options",
    delivery: "the team created a focused visual and content structure, implemented the responsive donation experience, and optimised it for fast international access",
    lesson: "a fundraising website should clearly identify the organisation and purpose, explain how funds are used, provide transparent wallet and network instructions, protect against address tampering, and make trust and contact information easy to verify",
  },
  "nirmalab-me": {
    client: "Nirmala Bandara",
    projectType: "manageable graphic-design portfolio",
    goal: "present graphic work through a minimal online portfolio that could be maintained without additional technical knowledge",
    capabilities: "an easily updated project collection, responsive minimal design, and a cost-conscious content workflow using Notion with a Popsy-powered front end",
    delivery: "wireframing and interface research shaped the public portfolio while the Notion content structure and Popsy integration were configured in parallel",
    lesson: "a creator choosing a lightweight portfolio stack should assess content structure, image delivery, accessibility, custom-domain control, platform dependencies, export options, and how easily future projects can be published consistently",
  },
  "national-youth-film-festival-website": {
    client: "National Youth Film Festival Sri Lanka",
    projectType: "film-festival and submission website",
    goal: "promote the short-film competition, explain the festival’s purpose, and collect entries through an online process within a tight delivery window",
    capabilities: "responsive event presentation, a multi-step submission form, press-release publishing, event galleries, and an administration flow for competition content",
    delivery: "kick-off planning and UI review established the information structure before the responsive front end, submission workflow, content features, and on-site SEO were delivered",
    lesson: "a festival submission site should publish eligibility and deadlines clearly, preserve entries safely, validate file and form requirements, acknowledge submissions, support accessible mobile completion, and define the review and data-retention process",
  },
  "rumikmart-ecommerce": {
    client: "Rumikmart",
    projectType: "multivendor e-commerce marketplace",
    goal: "create a modern Sri Lankan shopping destination where multiple vendors and their products could be managed through one branded platform",
    capabilities: "a WordPress, Elementor, and WooCommerce storefront with vendor management, products, coupons, payments, responsive shopping, and editable marketplace content",
    delivery: "the marketplace structure and brand experience were planned and refined before the approved design was developed into a responsive store with management features, speed work, and local SEO foundations",
    lesson: "a multivendor marketplace needs defined vendor onboarding and permissions, product moderation, commissions, payment and refund rules, inventory ownership, customer support, performance planning, and clear marketplace terms",
  },
  "osthar-lk": {
    client: "Osthar.lk",
    projectType: "hybrid e-learning and commerce platform",
    goal: "distribute online courses while also selling physical DVDs containing learning material through the same accessible website",
    capabilities: "learning and course management, digital access, physical product sales, payments, a simple learner interface, and editable content built with WordPress, WooCommerce, and Elementor",
    delivery: "a modern minimal interface and content structure were approved before the team implemented the combined learning and commerce journeys and completed speed and on-site SEO optimisation",
    lesson: "a hybrid learning store should distinguish digital access from physical fulfilment, connect payments to the correct entitlement, explain delivery and support, protect course content, and keep learner navigation simple on mobile",
  },
  "industrial-glove": {
    client: "Industrial Glove Lanka",
    projectType: "B2B manufacturing catalogue website",
    goal: "increase brand visibility, present industrial glove products professionally, and let buyers request a quotation for a specific product",
    capabilities: "a manageable glove catalogue, responsive corporate presentation, product-level quotation requests, and search and performance optimisation",
    delivery: "wireframing and brand discovery led to a tailored interface, after which the responsive product catalogue and separate quotation flow for each product were implemented",
    lesson: "a B2B safety-product website should provide useful specifications, applications and standards information, clear product taxonomy, downloadable evidence where available, qualified quotation fields, and an internal process for answering enquiries promptly",
  },
};

export function getPortfolioFaqs(slug: string): readonly FaqItem[] {
  const profile = portfolioFaqProfiles[slug];

  if (!profile) {
    throw new Error(`Missing portfolio FAQ profile for: ${slug}`);
  }

  return [
    {
      question: `What did ${profile.client} need from this ${profile.projectType}?`,
      answer: `${profile.client} needed to ${profile.goal}. The scope was therefore shaped around the client’s real content, users, operational responsibilities, and conversion path instead of applying a generic website template.`,
    },
    {
      question: `Which capabilities were delivered for ${profile.client}?`,
      answer: `The documented solution includes ${profile.capabilities}. These capabilities were selected to support the project requirements described in this case study; a new project would be scoped against its own users, systems, content, and constraints.`,
    },
    {
      question: `How did Codezela approach the ${profile.client} website build?`,
      answer: `For this project, ${profile.delivery}. This is a project-specific record of the delivered approach; the scope, timeline, and outcomes for a new build would depend on its own requirements and starting point.`,
    },
    {
      question: `What can teams planning a similar ${profile.projectType} learn from the ${profile.client} project?`,
      answer: `The practical takeaway is that ${profile.lesson}. Discovery should confirm those decisions before design and development so the final experience works for visitors and the people responsible for operating it.`,
    },
  ];
}

export const faqCoverage = {
  industrySlugs: Object.keys(industryFaqProfiles),
  portfolioSlugs: Object.keys(portfolioFaqProfiles),
} as const;

import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'he';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Header
    'header.title': 'Ariel Hasan',
    'header.subtitle': 'Architecture & Interior Design',
    'nav.portfolio': 'Portfolio',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    
    // Hero
    'hero.title': 'Architecture with Material.',
    'hero.description': 'Private homes in the Galilee, contemporary interior design, and bespoke carpentry — each project tells a story of material, light, and refined minimalist design.',
    'hero.cta': 'View Projects',
    
    // Portfolio
    'portfolio.label': 'Selected Works',
    'portfolio.title': 'Portfolio',
    'portfolio.description': 'A curated selection of projects presented through clean imagery and concise descriptions. From contemporary interiors to private home design, to advanced carpentry built with CNC and precision manufacturing technologies.',
    
    // Architecture Projects
    'project1.title': 'Stone House, Galilee',
    'project1.category': 'Residential Architecture',
    'project1.description': 'A contemporary residence that emerges from the hillside, where local stone meets modern glass. The design celebrates the dialogue between interior comfort and the dramatic landscape.',
    'project1.details': 'This 320 sqm home is anchored into a slope overlooking the Galilee valley. The architecture employs local limestone for the structural walls, creating thermal mass and connecting the building to its context.\\n\\nFloor-to-ceiling glass panels frame specific views while maintaining privacy. The interior features white oak millwork throughout, with all custom elements manufactured using precision CNC technology.\\n\\nA central courtyard brings light deep into the plan, while covered terraces extend the living spaces and provide shade during summer months.',
    
    'project2.title': 'Concrete Villa, Western Galilee',
    'project2.category': 'Residential Architecture',
    'project2.description': 'A study in horizontal planes and material honesty. Exposed concrete, large sliding glass, and carefully placed openings create a home that breathes with the landscape.',
    'project2.details': 'A 380 sqm residence defined by clean concrete surfaces and expansive glazing. The design organizes spaces along a linear axis, with each room opening to private outdoor areas.\\n\\nStructural concrete walls are left exposed and sealed, celebrating the material\'s texture and thermal properties. Custom steel-framed windows provide minimal sight lines and maximize transparency.\\n\\nInterior finishes include polished concrete floors, white oak cabinetry, and natural stone in wet areas. All lighting is integrated into architectural elements.',
    
    'project3.title': 'Courtyard Residence',
    'project3.category': 'Residential Architecture',
    'project3.description': 'An inward-facing home organized around a central garden. The design creates privacy and tranquility while maximizing natural light and cross-ventilation.',
    'project3.details': 'This 280 sqm home wraps around a central courtyard, bringing nature into the heart of the dwelling. All primary spaces open to this protected garden, creating a serene center of gravity.\\n\\nMaterials include textured plaster walls, large-format stone flooring, and custom wood screens that filter light. The courtyard features indigenous plants and a water element.\\n\\nThe architecture employs passive cooling strategies, with strategic openings that encourage airflow and deep overhangs that provide solar shading.',
    
    'project4.title': 'Hillside Home, Upper Galilee',
    'project4.category': 'Residential Architecture',
    'project4.description': 'A split-level residence that follows the natural topography. Each level reveals different landscape views, while maintaining spatial flow and connection.',
    'project4.details': 'Designed for a sloping site, this 300 sqm home steps down the hillside in three levels. The architecture uses the grade change to create distinct zones while maintaining visual and physical connectivity.\\n\\nMaterials include board-formed concrete retaining walls, limestone floors, and extensive use of wood for warmth. Large sliding glass panels can fully open living spaces to terraces.\\n\\nCustom millwork integrates storage and creates spatial definition without walls. All wood elements are precision-manufactured using CNC technology.',

    // Interior Design Projects
    'project5.title': 'Contemporary Kitchen',
    'project5.category': 'Interior Design',
    'project5.description': 'A minimalist kitchen where function and form achieve perfect balance. Custom oak cabinetry, integrated appliances, and a restrained material palette create timeless elegance.',
    'project5.details': 'Complete kitchen design for a 45 sqm space. The layout prioritizes workflow efficiency while maintaining visual calm through concealed storage and integrated appliances.\\n\\nCustom cabinetry in white oak with push-to-open mechanisms eliminates visible hardware. Countertops and backsplash in large-format natural stone provide continuous surfaces.\\n\\nLighting includes both task lighting under cabinets and ambient illumination integrated into the ceiling detail. All elements were designed as a unified system.',
    
    'project6.title': 'Master Suite',
    'project6.category': 'Interior Design',
    'project6.description': 'A private retreat emphasizing natural light, material warmth, and refined details. Custom millwork defines zones within an open plan.',
    'project6.details': 'A 55 sqm master bedroom and bathroom designed as a continuous space. The layout uses a custom millwork volume to separate sleeping and bathing areas while maintaining visual connection.\\n\\nFlooring throughout in wide-plank white oak. The millwork volume integrates wardrobe storage, display niches, and conceals the entrance to the bathroom.\\n\\nThe bathroom features natural stone surfaces, a freestanding soaking tub, and a walk-in shower with minimal glass partitions. All fixtures are wall-mounted for visual lightness.',
    
    'project7.title': 'Open-Plan Living Space',
    'project7.category': 'Interior Design',
    'project7.description': 'A 90 sqm living and dining area where custom furniture, curated materials, and strategic lighting create distinct zones within a flowing space.',
    'project7.details': 'Interior design for an open-plan living space that balances openness with intimacy. Different ceiling heights and custom rugs define zones without physical barriers.\\n\\nFurnishings include a custom-designed sectional sofa in natural linen, a dining table in solid walnut, and a media console in white oak with integrated lighting.\\n\\nThe material palette includes limestone floors, white oak millwork, and textured plaster walls. Lighting design creates different atmospheres for day and evening use.',
    
    'project8.title': 'Spa Bathroom',
    'project8.category': 'Interior Design',
    'project8.description': 'A bathroom that transcends function to become a sanctuary. Natural stone, subtle lighting, and meticulous detailing create an atmosphere of calm luxury.',
    'project8.details': 'A 30 sqm bathroom designed with spa-like qualities. Large-format natural stone covers floors and walls, creating continuous surfaces with minimal grout lines.\\n\\nFeatures include a walk-in rain shower, freestanding soaking tub positioned to face a private garden, and a custom double vanity in wood and stone.\\n\\nLighting is layered and dimmable, with LED strips integrated behind mirrors and within niches. Heated floors and a concealed sound system enhance comfort.',

    // Product Design Projects
    'project9.title': 'Modular Seating Collection',
    'project9.category': 'Product Design',
    'project9.description': 'A furniture system that balances architectural geometry with comfort. Solid wood frames, natural upholstery, and modular versatility.',
    'project9.details': 'A collection of seating elements that can be configured in multiple arrangements. Each piece features a solid wood frame in walnut or white oak with cushions upholstered in natural linen or wool.\\n\\nThe design emphasizes clean lines and precise joinery, with all wood components CNC-machined for accuracy. Cushions are custom-made with natural latex foam and down.\\n\\nModular elements include corner units, armless seats, and chaise sections, allowing clients to create configurations suited to their space.',
    
    'project10.title': 'Pendant Lighting Series',
    'project10.category': 'Product Design',
    'project10.description': 'A collection of pendant fixtures where wood, metal, and light create sculptural objects. Each piece is hand-assembled from precision-cut components.',
    'project10.details': 'A lighting collection featuring wood veneer shades with metal accents. Each shade is formed from thin wood veneer over a metal frame, creating warm, diffused illumination.\\n\\nAvailable in white oak, walnut, and ash, with powder-coated metal details in matte black or brass. The wood is finished with natural oil to enhance grain while providing protection.\\n\\nAll components are manufactured using CNC technology, ensuring consistent quality and fit. Each fixture is hand-assembled and tested before delivery.',

    // Carpentry Projects
    'project11.title': 'Precision Wood Joinery',
    'project11.category': 'Custom Carpentry',
    'project11.description': 'A showcase of advanced carpentry techniques where traditional joinery meets CNC precision. Complex connections executed in solid hardwood.',
    'project11.details': 'A collection of custom carpentry elements demonstrating advanced joinery techniques. Each piece is designed in 3D CAD software and manufactured using CNC routers and precision saws.\\n\\nMaterials include solid walnut, white oak, and ash. All connections use traditional joinery methods—mortise and tenon, dovetails, and finger joints—executed with CNC precision.\\n\\nFinishing involves careful hand-sanding followed by application of natural oils and waxes that enhance wood grain while providing durable protection.',
    
    'project12.title': 'Integrated Storage System',
    'project12.category': 'Custom Carpentry',
    'project12.description': 'A wall-to-wall millwork system that transforms storage into architecture. Custom shelving, concealed cabinets, and integrated lighting.',
    'project12.details': 'A comprehensive storage system designed for a 6-meter wall in a living space. The design integrates open shelving, closed cabinets, a media console, and a workspace.\\n\\nConstructed from white oak with push-to-open cabinet doors and soft-close drawer mechanisms. Open shelving features adjustable positions, while closed storage maintains a seamless facade.\\n\\nIntegrated LED lighting highlights displayed objects and provides ambient illumination. All components are CNC-manufactured for precision fit and installed as a unified system.',
    
    // About
    'about.label': 'Approach',
    'about.title': 'Material, Light, and Precision.',
    'about.description1': 'Every project is shaped by a deep understanding of the client, the landscape, and the meeting point between concept and execution.',
    'about.description2': 'My approach focuses on disciplined simplicity, crafted details, and a natural dialogue between materials — especially wood — bringing warmth and authenticity to every space.',
    'about.service1.title': 'Private Residential',
    'about.service1.description': 'Contemporary homes in the Galilee that respond to landscape and light.',
    'about.service2.title': 'Interior Design',
    'about.service2.description': 'Refined spaces with material depth and attention to every detail.',
    'about.service3.title': 'Bespoke Carpentry',
    'about.service3.description': 'Precision-built wood elements using CNC and advanced manufacturing.',
    
    // Contact
    'contact.label': 'Get in Touch',
    'contact.title': 'Let\'s Create Together.',
    'contact.description': 'Whether you\'re planning a private home, interior renovation, or custom carpentry project, I\'d love to hear about your vision.',
    'contact.email': 'Email',
    'contact.phone': 'Phone',
    'contact.location': 'Location',
    'contact.location.value': 'Galilee, Israel',
    
    // Footer
    'footer.copyright': '© 2026 Ariel Hasan. Architecture & Interior Design.',
  },
  he: {
    // Header
    'header.title': 'אריאל חסן',
    'header.subtitle': 'אדריכלות ועיצוב פנים',
    'nav.portfolio': 'תיק עבודות',
    'nav.about': 'אודות',
    'nav.contact': 'צור קשר',
    
    // Hero
    'hero.title': 'אדריכלות של חומר.',
    'hero.description': 'בתים פרטיים בגליל, עיצוב פנים עכשווי ונגרות בהתאמה אישית — כל פרויקט מספר סיפור של חומר, אור ועיצוב מינימליסטי מעודן.',
    'hero.cta': 'לתיק העבודות',
    
    // Portfolio
    'portfolio.label': 'עבודות נבחרות',
    'portfolio.title': 'תיק עבודות',
    'portfolio.description': 'מבחר פרויקטים מוקפד המוצג דרך תמונות נקיות ותיאורים תמציתיים. מעיצוב פנים עכשווי לתכנון בתים פרטיים, ועד נגרות מתקדמת הבנויה בטכנולוגיות CNC וייצור דיוק.',
    
    // Architecture Projects
    'project1.title': 'בית אבן, גליל',
    'project1.category': 'אדריכלות מגורים',
    'project1.description': 'בית מגורים עכשווי ה��ומח מהגבעה, שבו אבן מקומית נפגשת עם זכוכית מודרנית. העיצוב חוגג את הדיאלוג בין נוחות פנימית והנוף הדרמטי.',
    'project1.details': 'בית זה בשטח 320 מ"ר מעוגן במדרון המשקיף על עמק הגליל. האדריכלות משתמשת באבן גיר מקומית לקירות המבניים, יוצרת מסה תרמית ומחברת את המבנה להקשר.\\n\\nפאנלי זכוכית מרצפה לתקרה ממסגרים נופים ספציפיים תוך שמירה על פרטיות. הפנים כוללים נגרות אלון לבן בכל הבית, עם כל האלמנטים המותאמים אישית מיוצרים באמצעות טכנולוגיית CNC מדויקת.\\n\\נחצר מרכזית מביאה אור עמוק לתוך התוכנית, בעוד מרפסות מקורות מרחיבות את חללי המגורים ומספקות צל בחודשי הקיץ.',
    
    'project2.title': 'וילת בטון, גליל מערבי',
    'project2.category': 'אדריכלות מגורים',
    'project2.description': 'מחקר במישורים אופקיים וכנות חומרית. בטון חשוף, זכוכית הזזה גדולה ופתחים ממוקמים בקפידה יוצרים בית שנושם עם הנוף.',
    'project2.details': 'בית מגורים בשטח 380 מ"ר המוגדר על ידי משטחי בטון נקיים וזיגוג מרחיב. העיצוב מארגן חללים לאורך ציר ליניארי, כאשר כל חדר נפתח לאזורים חיצוניים פרטיים.\\n\\נקירות בטון מבניים נשארים חשופים ואטומים, חוגגים את המרקם והתכונות התרמיות של החומר. חלונות מסגרת פלדה מותאמים אישית מספקים קווי ראייה מינימליים וממקסמים שקיפות.\\n\\נגימורים פנימיים כוללים רצפות בטון מלוטש, ארונות אלון לבן ואבן טבעית באזורים רטובים. כל התאורה משולבת באלמנטים אדריכליים.',
    
    'project3.title': 'בית חצר',
    'project3.category': 'אדריכלות מגורים',
    'project3.description': 'בית הפונה פנימה המאורגן סביב גן מרכזי. העיצוב יוצר פרטיות ושלווה תוך מקסום אור טבעי ואוורור צולב.',
    'project3.details': 'בית זה בשטח 280 מ"ר עוטף חצר מרכזית, מביא את הטבע אל לב הדירה. כל החללים העיקריים נפתחים לגן מוגן זה, יוצרים מרכז כובד שליו.\\n\\נחומרים כוללים קירות טיח מרקם, ריצוף אבן בפורמט גדול ומסכי עץ מותאמים אישית המסננים אור. החצר כוללת צמחים מקומיים ומרכיב מים.\\n\\nTheאדריכלות משתמשת באסטרטגיות קירור פסיביות, עם פתחים אסטרטגיים המעודדים זרימת אוויר ומרפסות עמוקות המספקות הצללה סולארית.',
    
    'project4.title': 'בית מדרונות, גליל עליון',
    'project4.category': 'אדריכלות מגורים',
    'project4.description': 'בית רב-מפלסי העוקב אחר הטופוגרפיה הטבעית. כל מפלס מגלה נופי נוף שונים, תוך שמירה על זרימה ו חיבור מרחבי.',
    'project4.details': 'מתוכנן עבור אתר משופע, בית זה בשטח 300 מ"ר יורד במדרון בשלוש רמות. האדריכלות משתמשת בשינוי הגובה ליצירת אזורים מובחנים תוך שמירה על קישוריות חזותית ופיזית.\\n\\נחומרים כוללים קירות תמך מבטון יצוק בדפנות, רצפות אבן גיר ושימוש נרחב בעץ לחמימות. פאנלי זכוכית הזזה גדולים יכולים לפתוח לחלוטין את חללי המגורים למרפסות.\\n\\ננגרות מותאמת אישית משלבת אחסון ויוצרת הגדרה מרחבית ללא קירות. כל אלמנטי העץ מיוצרים בדיוק באמצעות טכנולוגיית CNC.',

    // Interior Design Projects
    'project5.title': 'מטבח עכשווי',
    'project5.category': 'עיצוב פנים',
    'project5.description': 'מטבח מינימליסטי שבו פונקציה וצורה משיגים איזון מושלם. ארונות אלון מותאמים אישית, מכשירים משולבים ופלטת חומרים מאופקת יוצרים אלגנטיות נצחית.',
    'project5.details': 'עיצוב מטבח מלא עבור חלל בשטח 45 מ"ר. הפריסה נותנת עדיפות ליעילות זרימת עבודה תוך שמירה על שקט ויזואלי דרך אחסון נסתר ומכשירים משולבים.\\n\\נארונות מותאמים אישית באלון לבן עם מנגנוני לחץ לפתיחה המבטלים חומרה נראית לעין. משטחי עבודה וחיפויים באבן טבעית בפורמט גדול מספקים משטחים רציפים.\\n\\נתאורה כוללת גם תאורת משימה מתחת לארונות וגם תאורה סביבתית משולבת בפרט התקרה. כל האלמנטים-budgetנו כמערכת מאוחדת.',
    
    'project6.title': 'סוויטת הורים',
    'project6.category': 'עיצוב פנים',
    'project6.description': 'מפלט פרטי מדגיש אור טבעי, חמימות חומרית ופרטים מעודנים. נגרות מותאמת אישית מגדירה אזורים בתוך תוכנית פתוחה.',
    'project6.details': 'חדר שינה ראשי ושירותים בשטח 55 מ"ר מתוכננים כחלל רציף. הפריסה משתמשת בנפח נגרות מותאם אישית להפרדה בין אזורי שינה ורחצה תוך שמירה על חיבור ויזואלי.\\n\\נריצוף לכל אורך באלון לבן בלוחות רחבים. נפח הנגרות משלב אחסון ארון בגדים, נישות תצוגה ומסתיר את הכניסה לחדר האמבטיה.\\n\\נחדר האמבטיה כולל משטחי אבן טבעית, אמבט שרייה עומד חופשי וקבינת מקלחת עם מחיצות זכוכית מינימליות. כל האביזרים מותקנים על הקיר לקלילות ויזואלית.',
    
    'project7.title': 'חלל מגורים פתוח',
    'project7.category': 'עיצוב פנים',
    'project7.description': 'אזור מגורים וסעודה בשטח 90 מ"ר שבו ריהוט מותאם אישית, חומרים מאוצרים ותאורה אסטרטגית יוצרים אזורים מובחנים בתוך חלל זורם.',
    'project7.details': 'עיצוב פנים עבור חלל מגורים פתוח המאזן בין פתיחות לאינטימיות. גבהי תקרה שונים ושטיחים מותאמים אישית מגדירים אזורים ללא מחסומים פיזיים.\\n\\נריהוט כולל ספה סקשנלית מעוצבת בד פשתן טבעי, שולחן אוכל בעץ אגוז מלא וקונסולת מדיה באלון לבן עם תאורה משולבת.\\n\\נפלטת החומרים כוללת רצפות אבן גיר, נגרות אלון לבן וקירות טיח מרקם. עיצוב התאורה יוצר אווירות שונות לשימוש יומם וערב.',
    
    'project8.title': 'חדר אמבטיה ספא',
    'project8.category': 'עיצוב פנים',
    'project8.description': 'חדר אמבטיה שמתעלה על הפונקציה להפוך למקדש. אבן טבעית, תאורה עדינה ופרטים קפדניים יוצרים אווירה של יוקרה שקטה.',
    'project8.details': 'חדר אמבטיה בשטח 30 מ"ר מעוצב עם איכויות דמויות ספא. אבן טבעית בפורמט גדול מכסה רצפות וקירות, יוצרת משטחים רציפים עם קווי פוגה מינימליים.\\n\\נתכונות כוללות קבינת מקלחת גשם, אמבט שרייה עומד חופשי הממוקם מול גן פרטי וכיור כפול מותאם אישית בעץ ואבן.\\n\\נתאורה היא שכבתית וניתנת לעמעום, עם רצועות LED משולבות מאחורי מראות ובתוך נישות. רצפות מחוממות ומערכת קול נסתרת משפרות את הנוחות.',

    // Product Design Projects
    'project9.title': 'קולקציית ישיבה מודולרית',
    'project9.category': 'עיצוב מוצר',
    'project9.description': 'מערכת ריהוט המאזנת בין גיאומטריה אדריכלית לנוחות. מסגרות עץ מלא, ריפוד טבעי וגמישות מודולרית.',
    'project9.details': 'קולקציית אלמנטי ישיבה שניתן להגדיר במספר סידורים. כל חתיכה כוללת מסגרת עץ מלא באגוז או אלון לבן עם כריות מרופדות בפשתן טבעי או צמר.\\n\\nTheتصميم מדגיש קווים נקיים וחיבור מדויק, עם כל רכיבי העץ מעובדים ב-CNC לדיוק. כריות מיוצרות בהתאמה אישית עם קצף לטקס טבעי ונוצות.\\n\\נאלמנטים מודולריים כוללים יחידות פינה, מושבים ללא משענות וחלקי שזלונג, המאפשרים ללקוחות ליצור תצורות המתאימות לחלל שלהם.',
    
    'project10.title': 'סדרת גופי תאורה תלויים',
    'project10.category': 'עיצוב מוצר',
    'project10.description': 'קולקציית גופי תאורה תלויים שבהם עץ, מתכת ואור יוצרים אובייקטים פיסוליים. כל חתיכה מורכבת ידנית מרכיבים חתוכים בדיוק.',
    'project10.details': 'קולקציית תאורה הכוללת אהילים מפורניר עץ עם מבטאי מתכת. כל אהיל מעוצב מפורניר עץ דק על מסגרת מתכת, יוצר הארה חמה ומפוזרת.\\n\\nזמין באלון לבן, אגוז ואפר, עם פרטי מתכת צבועים בהברקה שחור מט או פליז. העץ מושלם בשמן טבעי להדגשת הגרגר תוך מתן הגנה.\\n\\nכל הרכיבים מיוצרים באמצעות טכנולוגיית CNC, מבטיחים איכות והתאמה עקבית. כל גוף תאורה מורכב ידנית ונבדק לפני המסירה.',

    // Carpentry Projects
    'project11.title': 'חיבור עץ מדויק',
    'project11.category': 'נגרות מותאמת אישית',
    'project11.description': 'תצוגה של טכניקות נגרות מתקדמות שבהן חיבור מסורתי נפגש עם דיוק CNC. חיבורים מורכבים המבוצעים בעץ קשה מלא.',
    'project11.details': 'אוסף של אלמנטי נגרות מותאמים אישית המדגשים טכניקות חיבור מתקדמות. כל חתיכה מתוכננת בתוכנת CAD תלת-ממדית ומיוצרת באמצעות נתבי CNC ומסורים מדויקים.\\n\\nחומרים כוללים עץ אגוז מלא, אלון לבן ואפר. כל החיבורים משתמשים בשיטות חיבור מסורתיות—מוט וחריץ, זנב יונה וחיבורי אצבעות—מבוצעים בדיוק CNC.\\n\\נגימור כולל שיוף ידני קפדני ואחריו יישום שמנים וושעוות טבעיים המשפרים את גרגר העץ תוך מתן הגנה עמידה.',
    
    'project12.title': 'מערכת אחסון משולבת',
    'project12.category': 'נגרות מותאמת אישית',
    'project12.description': 'מערכת נגרות מקיר לקיר ההופכת אחסון לאדריכלות. מדפים מותאמים אישית, ארונות נסתרים ותאורה משולבת.',
    'project12.details': 'מערכת אחסון מקיפה מתוכננת עבור קיר באורך 6 מטר בחלל מגורים. העיצוב משלב מדפים פתוחים, ארונות סגורים, קונסולת מדיה וחלל עבודה.\\n\\נבנויה מאלון לבן עם דלתות ארון בלחיצה לפתיחה ומנגנוני מגירה סגירה רכה. מדפים פתוחים כוללים עמדות מתכווננות, בעוד אחסון סגור שומר על חזית חלקה.\\n\\נתאורת LED משולבת מדגישה חפצים מוצגים ומספקת הארה סביבתית. כל הרכיבים מיוצרים ב-CNC להתאמה מדויקת ומותקנים כמערכת מאוחדת.',
    
    // About
    'about.label': 'גישה',
    'about.title': 'חומר, אור ודיוק.',
    'about.description1': 'כל פרויקט מעוצב מתוך הבנה עמוקה של הלקוח, הנוף ונקודת המפגש בין קונספט לביצוע.',
    'about.description2': 'הגישה שלי מתמקדת בפשטות ממושמעת, פרטים מעוצבים ודיאלוג טבעי בין חומרים — במיוחד עץ — שמביאים חום ואותנטיות לכל מרחב.',
    'about.service1.title': 'מגורים פרטיים',
    'about.service1.description': 'בתים עכשוויים בגליל המגיבים לנוף ולאור.',
    'about.service2.title': 'עיצוב פנים',
    'about.service2.description': 'מרחבים מעודנים עם עומק חומרי ותשומת לב לכל פרט.',
    'about.service3.title': 'נגרות מותאמת אישית',
    'about.service3.description': 'אלמנטי עץ בנויים בדיוק תוך שימוש ב-CNC וייצור מתקדם.',
    
    // Contact
    'contact.label': 'צור קשר',
    'contact.title': 'בואו ניצור ביחד.',
    'contact.description': 'בין אם אתם מתכננים בית פרטי, שיפוץ פנים או פרויקט נגרות מותאם אישית, אשמח לשמוע על החזון שלכם.',
    'contact.email': 'אימייל',
    'contact.phone': 'טלפון',
    'contact.location': 'מיקום',
    'contact.location.value': 'גליל, ישראל',
    
    // Footer
    'footer.copyright': '© 2026 אריאל חסן. אדריכלות ועיצוב פנים.',
  }
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      <div dir={language === 'he' ? 'rtl' : 'ltr'} lang={language}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
export interface Certificates {
    images: string;
}

export interface AboutShort {
    subtext: string;
    description: string;
    services: string;
    lang: string;
}

export interface Hero {
    images: string;
    main_text: string;
    subtext: string;
    details: string;
    lang: string;
}

export interface Employee {
    image: string;
    name: string;
    position: string;
}

export interface Partners {
    images: string[];
}

export interface About {

    heading: string
    abilities: string
    lang: string

}

export interface Gallery {
    name: string
    image: string
}

export interface QueryResponse {
    getAboutShorts: AboutShort;
    getAbout: About
    getHeroes: Hero;
    getAllPartners: Partners;
    getAllCertificates: Certificates;
    getAllEmployees: Employee[];
    getGallery: Gallery[];

}

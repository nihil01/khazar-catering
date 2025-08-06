import {Hero} from "./hero.tsx";
import {AboutShort} from "./aboutshort.tsx";
import {Partners} from "./partners.tsx";
import {Certificates} from "./certificates.tsx";
import type {QueryResponse} from "../../utils/ResponseTypes.ts";

type Request = {

    res: QueryResponse | null

}


function Root(data: Request) {
    return (

        <div className="min-h-screen bg-white dark:bg-neutral-900 text-black dark:text-white">

            <Hero data={data.res?.getHeroes} />

            <AboutShort data={data.res?.getAboutShorts} />
            
            <Partners data={data.res?.getAllPartners}/>

            <Certificates data={data.res?.getAllCertificates}/>

        </div>

    );

}

export default Root;

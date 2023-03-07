export namespace config {
	
	export class Authorization {
	    type: string;
	    username: string;
	    password: string;
	    clientID: string;
	    clientSecret: string;
	    tokenURL: string;
	
	    static createFrom(source: any = {}) {
	        return new Authorization(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.type = source["type"];
	        this.username = source["username"];
	        this.password = source["password"];
	        this.clientID = source["clientID"];
	        this.clientSecret = source["clientSecret"];
	        this.tokenURL = source["tokenURL"];
	    }
	}
	export class Configuration {
	    key: string;
	    apiURL: string;
	    authorization: Authorization;
	
	    static createFrom(source: any = {}) {
	        return new Configuration(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.key = source["key"];
	        this.apiURL = source["apiURL"];
	        this.authorization = this.convertValues(source["authorization"], Authorization);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class ConfigurationFile {
	    activeTenantKey: string;
	    tenants: Configuration[];
	
	    static createFrom(source: any = {}) {
	        return new ConfigurationFile(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.activeTenantKey = source["activeTenantKey"];
	        this.tenants = this.convertValues(source["tenants"], Configuration);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}

}

export namespace main {
	
	export class Address {
	    street: string;
	    postcode: string;
	
	    static createFrom(source: any = {}) {
	        return new Address(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.street = source["street"];
	        this.postcode = source["postcode"];
	    }
	}
	export class Person {
	    name: string;
	    age: number;
	    address?: Address;
	
	    static createFrom(source: any = {}) {
	        return new Person(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.name = source["name"];
	        this.age = source["age"];
	        this.address = this.convertValues(source["address"], Address);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}

}

export namespace model {
	
	export class Metadata {
	    id: string;
	    uri: string;
	    type: string;
	    content_type: string;
	    media_src: string;
	    edit_media: string;
	
	    static createFrom(source: any = {}) {
	        return new Metadata(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.uri = source["uri"];
	        this.type = source["type"];
	        this.content_type = source["content_type"];
	        this.media_src = source["media_src"];
	        this.edit_media = source["edit_media"];
	    }
	}
	export class IntegrationFlow {
	    __metadata: Metadata;
	    Id: string;
	    Version: string;
	    PackageId: string;
	    Name: string;
	    Description: string;
	    Sender: string;
	    Receiver: string;
	
	    static createFrom(source: any = {}) {
	        return new IntegrationFlow(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.__metadata = this.convertValues(source["__metadata"], Metadata);
	        this.Id = source["Id"];
	        this.Version = source["Version"];
	        this.PackageId = source["PackageId"];
	        this.Name = source["Name"];
	        this.Description = source["Description"];
	        this.Sender = source["Sender"];
	        this.Receiver = source["Receiver"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class IntegrationPackage {
	    Id: string;
	    Name: string;
	    Description: string;
	    ShortText: string;
	    Version: string;
	    Vendor: string;
	    PartnerContent: boolean;
	    UpdateAvailable: boolean;
	    Mode: string;
	    SupportedPlatform: string;
	    ModifiedBy: string;
	    CreationDate: string;
	    ModifiedDate: string;
	    CreatedBy: string;
	    Products: string;
	    Keywords: string;
	    Countries: string;
	    Industries: string;
	    LineOfBusiness: string;
	
	    static createFrom(source: any = {}) {
	        return new IntegrationPackage(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Id = source["Id"];
	        this.Name = source["Name"];
	        this.Description = source["Description"];
	        this.ShortText = source["ShortText"];
	        this.Version = source["Version"];
	        this.Vendor = source["Vendor"];
	        this.PartnerContent = source["PartnerContent"];
	        this.UpdateAvailable = source["UpdateAvailable"];
	        this.Mode = source["Mode"];
	        this.SupportedPlatform = source["SupportedPlatform"];
	        this.ModifiedBy = source["ModifiedBy"];
	        this.CreationDate = source["CreationDate"];
	        this.ModifiedDate = source["ModifiedDate"];
	        this.CreatedBy = source["CreatedBy"];
	        this.Products = source["Products"];
	        this.Keywords = source["Keywords"];
	        this.Countries = source["Countries"];
	        this.Industries = source["Industries"];
	        this.LineOfBusiness = source["LineOfBusiness"];
	    }
	}

}


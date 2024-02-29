import config from "config";

export function getEnv(envName){
    return config.get(envName);
}
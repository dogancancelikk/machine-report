import {Machine} from "../model/Machine";
import {MachineStats} from "../model/MachineStats";
import {findMachineStatsByID, getAllMachines} from "../data/machine";


export const getMachine = async (barcode: string) : Promise<Machine> =>{
    if (!barcode) {
        throw new Error("Barcode value is missing! ")
    }
    const machineList = await getAllMachines();
    const filteredMachines = machineList["data"]["entities"].filter((el: any) => el['barcode'] === barcode);
    if (filteredMachines.length === 0) {
        throw new Error("The requested machine does not exist");
    }

    return new Machine(filteredMachines[0]["id"], filteredMachines[0]["barcode"]);
}


export const getMachineStatsByID = async (machineID: string): Promise<MachineStats> =>{
    if (!machineID) {
        throw new Error("Machine Id cannot be null");
    }
    const machineStats = await findMachineStatsByID(machineID);
    return new MachineStats(machineStats["data"]["machineStats"]["prodAmount"], machineStats["data"]["machineStats"]["oee"]);
}






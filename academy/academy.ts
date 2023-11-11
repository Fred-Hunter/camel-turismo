export interface Academy {
    buildings: AcademyBuilding[];
}

export interface AcademyBuilding {
    type: AcademyBuildingType,
    level: AcademyBuildingLevel
    coords: AcademyBuildingCoords
}

export type AcademyCoord = 0 | 1 | 2 | 3 | 4 | 5;

export interface AcademyBuildingCoords {
    x: AcademyCoord,
    y: AcademyCoord
}

export enum AcademyBuildingType {
    Dwelling,
    Stables,
    Farm
}

export enum AcademyBuildingLevel {
    Basic,
    Intermediate,
    Advanced
}

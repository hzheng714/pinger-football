export interface Player {
    id: number;
    name: string;
    photo: string;
    age: number;
    nationality: string;
    height: string;
    weight: string;
    injured: boolean;
}

export interface PlayerItem {
    player: Player;
}



export interface Item {
    id: number,
    name: string,
    directions: {
        containerID: number,
        locationID: number,
        description: string
    },
    size: string
}

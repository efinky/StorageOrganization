import { Injectable } from '@angular/core';
import { Item } from './item';
import { Container } from './container';
import { Location } from './location';
import { initializeDatabase, Database } from '../database';


@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  nextItemId: number;
  nextLocationId: number;
  nextContainerId: number;
  dbPromise: Promise<Database>;

  constructor() {
    this.nextItemId = Math.max(...this.items.map((item) => item.id)) + 1;
    this.nextLocationId = Math.max(...this.items.map((item) => item.id)) + 1;
    this.nextContainerId = Math.max(...this.items.map((item) => item.id)) + 1;
    this.dbPromise = initializeDatabase();
  }

  addLocation(locationName: string, width: number, height: number, locationDescription: string): void {
    const location: Location = {
      id: this.nextLocationId,
      name: locationName,
      width: width,
      height: height,
      description: locationDescription
    }

    
    this.nextLocationId++;
    this.locations.push(location);
    console.log(this.locations);
  }
  updateContainerLocation(containerID: number, LocationID: number, locationPosition: [number, number]) {
    const currentContainer = this.containers.find(container => container.id===containerID);
    if (currentContainer) {
      currentContainer.locationID = LocationID;
      currentContainer.locationPosition = locationPosition;
    }
    else {
      console.log("there is no container!")
    }
    
  }
  
  addContainer(containerName: string, width: number, height: number, containerDescription: string):void {
    const container: Container = {
      id: this.nextContainerId,
      name: containerName,
      width: width,
      height: height,
      locationID: -1,
      locationPosition: [-1,-1],
      description: containerDescription
    }

    
    this.nextLocationId++;
    this.containers.push(container);
    console.log(this.containers);
  }

  updateItemDirections(itemID: number, containerID: number, locationID: number, directionsDescription: string): void {
    const currentItem = this.items.find(item => item.id===itemID);
    if (currentItem) {
      currentItem.directions.containerID = containerID;
      currentItem.directions.locationID = locationID;
      currentItem.directions.description = directionsDescription;
    }
    else {
      console.log("there is no item!")
    }
  }
  async getItems(): Promise<Item[]> {
    let db = await this.dbPromise;
    let asdf = db.exec("SELECT * FROM items");
    console.log(asdf);
    return this.items;
  }
  getLocations() {
    return this.locations;
  }

  addToContainer(itemID: number, containerID: number): void {

  }

  capitilizeFirstLetters(description: string): string {

    return "test"
  }

  addItem(name: string, containeID: number, locationID: number, description: string, size: string): void {
    const item: Item = {
      id: this.nextItemId,
      name: name,
      directions: {
        containerID: containeID,
        locationID: locationID,
        description: description
      },
      size: size,
    };
    this.nextItemId++;
    this.items.push(item);
    console.log(this.items);
  }
  containers: Container[] = [
    {
      id: 1,
      name: 'self-contained',
      width: 1,
      height: 1,
      locationID: 2,
      locationPosition: [2,2],
      description: 'string',
    },
  ];

  public locations: Location[] = [
    {
      id: 1,
      name: "Garage",
      width: 10,
      height: 10,
      description: "that thing you put cars in"
    },
    {
      id: 2,
      name: "Shed",
      width: 4,
      height: 6,
      description: "the building out back"
    },
    {
      id: 3,
      name: "Downstairs Storage Room",
      width: 4,
      height: 6,
      description: "The creepy room in the basement with no windows"
    }
  ]
  
  items: Item[] = [
    { id: 1, name: 'truck', directions: {containerID: 2, locationID: 2, description: "the white box in the garage"}, size: 'Galaxy' },
    { id: 2, name: 'bike', directions: {containerID: 4, locationID: 3, description: "the red box in the garage"}, size: 'Enormous' },
    { id: 3, name: 'lawnmower', directions: {containerID: -1, locationID: 3, description: "on the shelf in the garage"}, size: 'Super Big' },
  ];
}

/* tslint:disable */
import * as _ from 'lodash';

export interface IDataGeneratorFunc {
    generateData(offset: number): any;
}

export interface DataGeneratorStructure {
    [field: string]: IDataGeneratorFunc;
}

class BetweenGenerator implements IDataGeneratorFunc {
    constructor(
        private min: number,
        private max: number
    ) { };

    public generateData() {
        return this.min + Math.random() * (this.max - this.min);
    }
}

class TextGenerator implements IDataGeneratorFunc {
    constructor(private text: string) { }

    generateData() {
        return this.text;
    }
}

class BoolGenerator implements IDataGeneratorFunc {
    constructor() { }

    generateData() {
        return Math.round(Math.random()) === 0;
    }
}

class Picker implements IDataGeneratorFunc {
    constructor(private elementsToPick: string[]) { }

    generateData() {
        const { elementsToPick: els } = this;
        return els[Math.floor(Math.random() * els.length)];
    }
}

class Custom implements IDataGeneratorFunc {
    constructor(private callback: (offset: number) => any) { }

    generateData(offset: number) {
        return this.callback(offset);
    }
}

export class DataGenerator {
    constructor(
        private dataStructure: DataGeneratorStructure
    ) { }

    public generate<T>(offset: number = 0): T {
        const output = <T>{};

        _.forOwn(this.dataStructure, (generator: IDataGeneratorFunc, key: string) => {
            output[key] = generator.generateData(offset);
        });

        return output;
    }

    public generateMany<T>(length: number): T[] {
        const output: T[] = [];

        for(let i = 0; i < length; i++) {
            output.push(this.generate<T>(i));
        }

        return output;
    }

    public static between(min: number, max: number) {
        return new BetweenGenerator(min, max);
    }

    public static text(text: string) {
        return new TextGenerator(text);
    }

    public static boolean() {
        return new BoolGenerator();
    }

    public static pick(elementsToPick: string[]) {
        return new Picker(elementsToPick);
    }

    public static custom(callback: (offset: number) => any) {
        return new Custom(callback);
    }
}
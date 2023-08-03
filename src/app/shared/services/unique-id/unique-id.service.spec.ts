import { UniqueIdService } from './unique-id.service';

/*
describe() recebe dois parâmetros. 
    1º => descrição do artefato/componente/service que queremos testar;
    2º => função callback.
*/

describe(UniqueIdService.name, () => {
  let service: UniqueIdService = null;
  /*
    beforeEach() garante que cada teste/it() tenha seu conjunto de dados/metadados.    
  */
  beforeEach(() => {
    service = new UniqueIdService();
  });

  /*
    it() recebe dois parâmetros.
    1º => descrição do cenário que queremos testar;
        Pattern: `#${<nomeService.prototype.nomeMétodo.name>} 
            should <ação esperada> when <condição esperada>`
    2º => função callback.
  */
  it(`#${UniqueIdService.prototype.generateUniqueIdWithPrefix.name} 
        should return a generated ID when called with a prefix`, () => {
    // Preparação
    const id = service.generateUniqueIdWithPrefix('app');

    // Execução
    expect(id.startsWith('app-')).toBeTrue();
  });

  it(`#${UniqueIdService.prototype.generateUniqueIdWithPrefix.name} 
        should not generate duplicate IDs when called multiple times`, () => {
    // o Set() é uma estrutura de dados que não permite duplicação de valores
    const ids = new Set();

    for (let i = 0; i < 50; i++) {
      ids.add(service.generateUniqueIdWithPrefix('app'));
    }

    expect(ids.size).toBe(50);
  });

  it(`#${UniqueIdService.prototype.getNumberOfGeneratedUniqueIds.name} 
        should return the number of generated IDs when called`, () => {
    service.generateUniqueIdWithPrefix('app');
    service.generateUniqueIdWithPrefix('app');

    expect(service.getNumberOfGeneratedUniqueIds()).toBe(2);
  });

  it(`#${UniqueIdService.prototype.generateUniqueIdWithPrefix.name}
    should throw when called with empty`, () => {
    const emptyValues = [null, undefined, ''];

    /*
    withContext() é um método que permite adicionar uma descrição ao teste.
        ajuda a identificar qual dos valores do array emptyValues causou o erro.
    */
    emptyValues.forEach((emptyValue) => {
      expect(() => service.generateUniqueIdWithPrefix(emptyValue))
      .withContext(`Empty value: ${emptyValue}`)
      .toThrow();
    });
  });
});

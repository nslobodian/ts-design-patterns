abstract class DataMiner {
  mine(path: string) {
    this.openFile(path);
    this.extractData();
    this.parseData();
    this.analyzeData();
    this.sendReport();
    this.closeFile();
  }

  protected openFile(path: string) {
    console.log("Open file:", path);
  }

  protected analyzeData() {
    console.log("Analyze data");
  }

  protected sendReport() {
    console.log("Send report");
  }

  protected closeFile() {
    console.log("Close file");
  }

  protected abstract parseData(): void;

  protected abstract extractData(): void;
}

class PDFMiner extends DataMiner {
  protected extractData(): void {
    console.log("Extract PDF Data");
  }

  protected parseData(): void {
    console.log("Parse PDF data");
  }
}

class XMLMiner extends DataMiner {
  protected extractData(): void {
    console.log("Extract XML Data");
  }

  protected parseData(): void {
    console.log("Parse XML data");
  }
}

(() => {
  const PATH = "path/to/file";

  console.log("______PDF Miner________");
  const pdfMiner = new PDFMiner();
  pdfMiner.mine(PATH);

  console.log("\n______XML Miner________");
  const xmlMiner = new XMLMiner();
  xmlMiner.mine(PATH);
})();

import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import axios from 'axios';
import { JSDOM } from 'jsdom';
import { EmployeesService } from 'src/employees/employees.service';

@Injectable()
export class ParserService implements OnApplicationBootstrap {
  private static readonly jetUpUrl: string = 'https://jetup.digital/team';

  constructor(private readonly employeesService: EmployeesService) {}
  async onApplicationBootstrap() {
    const employees = await this.parseJetUpEmployees();
    await this.employeesService.createMany(employees);
  }

  private async parseJetUpEmployees(): Promise<ParsedEmployee[]> {
    const html = await this.getJetUpHTML();
    const parsedEmployees = this.parseJetUpHTML(html);
    return parsedEmployees;
  }

  private async getJetUpHTML(): Promise<string> {
    const response = await axios.get(ParserService.jetUpUrl);
    return response.data;
  }

  private parseJetUpHTML(html: string): ParsedEmployee[] {
    const { window } = new JSDOM(html);
    const employeesNodes = this.getEmployeesNodes(window.document);
    return this.parseEmployeesNodes(employeesNodes);
  }

  private getEmployeesNodes(document: Document): NodeListOf<Element> {
    return document.querySelectorAll('.text-block-item');
  }

  private parseEmployeesNodes(
    employeesNodes: NodeListOf<Element>,
  ): ParsedEmployee[] {
    return Array.from(employeesNodes).map((employeeNode) => {
      return this.parseEmployeeNode(employeeNode);
    });
  }

  private parseEmployeeNode(employeeNode: Element): ParsedEmployee {
    const image = this.getImageURL(employeeNode);
    const position = this.getPosition(employeeNode);
    const about = this.getAbout(employeeNode);
    const name = this.getName(employeeNode);
    return { image, name, position, about };
  }

  private getImageURL(employeeNode: Element): string | null {
    return employeeNode.getAttribute('data-image');
  }

  private getName(employeeNode: Element): string | null {
    const nameNode = employeeNode.querySelector('.user-name');
    return nameNode.textContent;
  }

  private getPosition(employeeNode: Element): string | null {
    const positionNode = employeeNode.querySelector('.position');
    return positionNode.textContent;
  }

  private getAbout(employeeNode: Element): string | null {
    const aboutNode = employeeNode.querySelector('.user-text');
    return aboutNode.textContent;
  }
}

interface ParsedEmployee {
  image: string;
  name: string;
  position: string;
  about: string;
}

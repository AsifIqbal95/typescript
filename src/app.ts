interface Draggable {
  dragStartHandler(event: DragEvent): void;
  dragEndHandler(event: DragEvent): void;
}

interface DragTarget {
  dragOverHandler(event: DragEvent): void
  dropHandler(event: DragEvent): void
  dragLeaveHandler(event: DragEvent): void
}

interface Validatable {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

enum ProjectStatus {
  Active, Finished
}

abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  templateElement: HTMLTemplateElement;
  hostElement: T;
  element: U;
  constructor(templateId: string, hostId: string, insertAtStart: boolean, newElementId?: string) {
    this.templateElement = document.getElementById(templateId) as HTMLTemplateElement;
    this.hostElement = document.getElementById(hostId) as T;
    const importedNode = document.importNode(this.templateElement.content, true);
    this.element = importedNode.firstElementChild as U;
    if (newElementId) {
      this.element.id = newElementId
    }
    this.attach(insertAtStart)
  }
  private attach(insertAtStart: boolean) {
    this.hostElement.insertAdjacentElement(insertAtStart ? 'afterbegin' : 'beforeend', this.element);
  }
}


class Project {
  constructor(public id: string, public title: string, public description: string, private people: number, public status: ProjectStatus) {
  }
  get peopleInfo() {
    if (this.people === 1) {
      return '1 person'
    }
    return `${this.people} persons`
  }
}

type Listener<T> = (items: T[]) => void

function validate(validatableInput: Validatable) {
  let isValid = true;
  if (validatableInput.required) {
    isValid = isValid && validatableInput.value.toString().trim().length > 0
  }
  if (validatableInput.minLength != null && typeof validatableInput.value === 'string') {
    isValid = isValid && validatableInput.value.trim().length >= validatableInput.minLength
  }
  if (validatableInput.maxLength != null && typeof validatableInput.value === 'string') {
    isValid = isValid && validatableInput.value.trim().length <= validatableInput.maxLength
  }
  if (validatableInput.min != null && typeof validatableInput.value === 'number') {
    isValid = isValid && validatableInput.value >= validatableInput.min
  }
  if (validatableInput.max != null && typeof validatableInput.value === 'number') {
    isValid = isValid && validatableInput.value <= validatableInput.max
  }
  return isValid;
}



function AutoBind(_: any, _1: any, descriptor: PropertyDescriptor) {
  const origFn = descriptor.value;
  const finalDescriptor: PropertyDescriptor = {
    get() {
      return origFn.bind(this)
    }
  }
  return finalDescriptor
}

class State<T> {
  protected listeners: Listener<T>[];
  constructor() {
    this.listeners = []
  }
  addListener(fn: Listener<T>) {
    this.listeners.push(fn)
  }
}

class ProjectState extends State<Project>{
  projects: Project[];
  static instance: ProjectState;
  private constructor() {
    super()
    this.projects = []
  }
  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectState();
    return this.instance;
  }

  addProject(title: string, description: string, people: number) {

    let project = new Project(Math.random().toString(), title, description, people, ProjectStatus.Active)
    this.projects.push(project)
    this.updateListeners()
  }

  moveProject(projId: string, newStatus: ProjectStatus) {
    const project = this.projects.find(prj => prj.id === projId);
    if (project) {
      project.status = newStatus;
      this.updateListeners()
    }
  }

  private updateListeners() {
    this.listeners.forEach((listner: Listener<Project>) => listner(this.projects.slice()))
  }
}

const prjState = ProjectState.getInstance();

class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
  private project: Project
  constructor(hostId: string, projectParam: Project) {
    super("single-project", hostId, false, projectParam.id)
    this.project = projectParam;
    this.renderContent()
    this.configure()
  }
  renderContent() {
    this.element.querySelector('h2')!.textContent = this.project.title;
    this.element.querySelector('h3')!.textContent = this.project.peopleInfo;
    this.element.querySelector('p')!.textContent = this.project.description
  }

  @AutoBind
  dragStartHandler(event: DragEvent): void {
    event.dataTransfer!.setData('text/plain', this.project.id);
    event.dataTransfer!.effectAllowed = 'move';
  }

  @AutoBind
  dragEndHandler(event: DragEvent): void {
    console.log('DE')
    console.log(event)
  }

  configure() {
    this.element.addEventListener('dragstart', this.dragStartHandler)
    this.element.addEventListener('dragend', this.dragEndHandler)
  }

}

class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget {
  assignedProjects: Project[];

  constructor(private type: 'active' | 'finished') {
    super('project-list', 'app', false, `${type}-projects`)
    this.assignedProjects = []
    this.renderContent()
    this.element.addEventListener('dragover', this.dragOverHandler)
    this.element.addEventListener('dragleave', this.dragLeaveHandler)
    this.element.addEventListener('drop', this.dropHandler)
    prjState.addListener((projects: Project[]) => {
      let relProjects = projects.filter((p: Project) => {
        if (this.type === 'active') {
          return p.status === ProjectStatus.Active;
        }
        else {
          return p.status === ProjectStatus.Finished
        }
      })
      this.assignedProjects = relProjects
      this.renderProjects()
    })
  }
  private renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector('ul')!.id = listId;
    this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS';
  }

  private renderProjects() {
    this.element.querySelector('ul')!.innerHTML = '';
    this.assignedProjects.forEach((project: Project) => {
      new ProjectItem(this.element.querySelector('ul')!.id, project)
      // let listItem = document.createElement('li');
      // listItem.textContent = project.title;
      // this.element.querySelector('ul')!.appendChild(listItem);
    })
  }
  @AutoBind
  dragOverHandler(event: DragEvent): void {
    if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
      event.preventDefault();
      const listel = this.element.querySelector('ul');
      listel!.classList.add('droppable')
    }
  }
  @AutoBind
  dragLeaveHandler(_: DragEvent): void {

    const listel = this.element.querySelector('ul');
    listel!.classList.remove('droppable')
  }
  @AutoBind
  dropHandler(event: DragEvent): void {
    const prjId = event.dataTransfer!.getData('text/plain');
    prjState.moveProject(prjId, this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished)

  }

}

class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {


  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    super('project-input', 'app', true, 'user-input')

    this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;
    this.configure()
  }

  private gatherUserInput(): [string, string, number] | void {
    let enteredTitle = this.titleInputElement.value;
    let enteredDescription = this.descriptionInputElement.value;
    let enteredPeople = this.peopleInputElement.value;

    if (!validate({ value: enteredTitle, required: true }) || !validate({ value: enteredDescription, required: true, minLength: 5 }) || !validate({ value: +enteredPeople, required: true, min: 1, max: 10 })) {
      alert('Not a valid input')
    }
    else {
      return [enteredTitle, enteredDescription, +enteredPeople]
    }
  }

  private clearInputs() {
    this.titleInputElement.value = '';
    this.descriptionInputElement.value = '';
    this.peopleInputElement.value = '';
  }

  @AutoBind
  private submitHandler(e: Event) {
    e.preventDefault();
    const userInput = this.gatherUserInput()
    if (Array.isArray(userInput)) {
      const [title, description, people] = userInput
      console.log(title, description, people)
      prjState.addProject(title, description, people)
      this.clearInputs()
    }
  }

  private configure() {
    this.element.addEventListener('submit', this.submitHandler)
  }

}



const prjInput = new ProjectInput()
const activeprjList = new ProjectList('active');
const finishedprjList = new ProjectList('finished');
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HomeComponent } from "./home.component";
import { BookService } from "src/app/services/book.service";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Pipe, PipeTransform } from "@angular/core";
import { Book } from "src/app/models/book.model";
import { of, pipe } from "rxjs";

describe('Home component', () => {

    const listBookBase: Book[] = [
        {
            name: "Test1",
            author: "",
            isbn: "",
            price: 10,
            amount: 1
        },
        {
            name: "Test2",
            author: "",
            isbn: "",
            price: 20,
            amount: 2
        }
    ];

    const bookSvcMock = {
        getBooks: () => of(listBookBase)
    }

    @Pipe({name: 'reduceText'})
    class ReduceTextPipeMock implements PipeTransform{
        transform(value: string, ...args: number[]): string {
            return value.substring(0, args[0]);
        }
    }

    let component: HomeComponent;
    let service: BookService;
    let fixture: ComponentFixture<HomeComponent>;


    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            declarations: [HomeComponent, ReduceTextPipeMock],
            providers: [
                // BookService
                {
                    provide: BookService,
                    useValue: bookSvcMock
                }
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
        }).compileComponents();
    });


    beforeEach(() => {
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        service = fixture.debugElement.injector.get(BookService);
    })


    it('should create', () => {
        expect(component).toBeTruthy();
    });

    
    it('getBooks get books from subscription', () => {
        const spy = spyOn(service, 'getBooks').and.callThrough();
        component.getBooks();
        
        expect(spy).toHaveBeenCalled();
        expect(component.listBook.length).toBe(2);
    });


});
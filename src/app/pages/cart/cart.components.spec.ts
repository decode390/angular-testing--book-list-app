import { CartComponent } from "./cart.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { BookService } from "../../services/book.service";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { Book } from "../../models/book.model";

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


describe('card component', () => { 
    let component: CartComponent;
    let fixture: ComponentFixture<CartComponent>;
    let bookService: BookService;


    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            declarations: [CartComponent],
            providers: [BookService],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
        }).compileComponents();
    });
    

    beforeEach(()=> {
        fixture = TestBed.createComponent(CartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        bookService = fixture.debugElement.injector.get(BookService);
        spyOn(bookService, 'getBooksFromCart').and.callFake(() => null);
    });


    it('should create', () => {
        expect(component).toBeTruthy();
    });


    it('getTotalPrice returns an amount', () => {
        const totalPrice = component.getTotalPrice([...listBookBase]);
        expect(totalPrice).toEqual(50);
    });


    it('onInputNumberChange must be increment', () => {
        const action = 'plus';
        const book = {...listBookBase[0]} as Book;

        const spyUpdateAmountBook = spyOn(bookService, 'updateAmountBook').and.callFake(() => []);
        const spyGetTotalPrice = spyOn(component, 'getTotalPrice').and.callFake(() => 0);
        component.onInputNumberChange(action, book);

        expect(spyUpdateAmountBook).toHaveBeenCalled();
        expect(spyGetTotalPrice).toHaveBeenCalled();
        expect(book.amount).toBe(2);
    });


    it('onInputNumberChange must be decrement', () => {
        const action = 'minus';
        const book = {...listBookBase[0]} as Book;

        const spyUpdateAmountBook = spyOn(bookService, 'updateAmountBook').and.callFake(() => []);
        const spyGetTotalPrice = spyOn(component, 'getTotalPrice').and.callFake(() => 0);
        component.onInputNumberChange(action, book);

        expect(spyUpdateAmountBook).toHaveBeenCalled();
        expect(spyGetTotalPrice).toHaveBeenCalled();
        expect(book.amount).toBe(0);
    });


    it('onClearBooks should be work correctly', () => {
        const spyclearListCartBook = spyOn((component as any), '_clearListCartBook').and.callThrough();
        const spyremoveBooksFromCart = spyOn(bookService, 'removeBooksFromCart').and.callFake(() => {});

        component.listCartBook = [...listBookBase];
        component.onClearBooks();
        expect(component.listCartBook.length).toBe(0);
        expect(spyclearListCartBook).toHaveBeenCalled();
        expect(spyremoveBooksFromCart).toHaveBeenCalled();
    });




});
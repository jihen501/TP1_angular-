import { Component } from "@angular/core";
import {
  BehaviorSubject,
  Observable,
  concatMap,
  takeWhile,
  scan,
  tap,
} from "rxjs";
import { Product } from "./dto/product.dto";
import { ProductService } from "./services/product.service";
import { Settings } from "./dto/product-settings.dto";
import { ProductApiResponse } from "./dto/product-api-response.dto";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"],
}) export class ProductsComponent{
  private productsSubject = new BehaviorSubject<number>(0);
  products$!: Observable<any>;
  private limit = 12;
  
  disableButton = false;


  constructor(private productService: ProductService) {}
  
  ngOnInit(): void {
    this.products$ = this.productsSubject.pipe(
      concatMap(skip => this.productService.getProducts({skip:skip, limit:this.limit})),
      tap(response => {
        if (response.total < response.skip + this.limit) {
          this.disableButton = true;
        }
      }),
      takeWhile(response => response.total > response.skip+this.limit, true),
      scan((acc: Product[], response: ProductApiResponse) => [...acc, ...response.products], [])
    );
  }
  
  loadMore(): void {
    const currentSkip = this.productsSubject.value;
    this.productsSubject.next(currentSkip + this.limit);
  }
}

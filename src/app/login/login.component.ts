
declare var google:any;
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
 

  private router =inject(Router);

  ngOnInit(): void {
    google.accounts.id.initialize({
      client_id: '1071990994819-c8jkb6bdi56uelvd44qhms3kafvte8gt.apps.googleusercontent.com',
      callback: (resp: any)=> this.handleLogin(resp)
      
    });


    google.accounts.id.renderButton(document.getElementById("google-btn"), {
      theme: 'filled_blue',
      size: 'large',
      shape: 'rectangle',
      width: 350
    })
  }

  private decodeToken(token: string){
    return JSON.parse(atob(token.split(".")[1]));
  }
  

  handleLogin(response: any){
    console.log(response);
    if(response) {
      //decode the token
      const payLoad = this.decodeToken(response.credential);
      //store in session
      console.log(payLoad)
      sessionStorage.setItem("loggedInUser", JSON.stringify(payLoad));
      //navigate to home/browse
      this.router.navigate(['browse'])
    }
  }

}

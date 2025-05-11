import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProdutoResponse } from '../../models/response/produto.response';
import { ProdutoEdicaoRequest } from '../../models/request/produtoEdicao.request';
import { ProdutoRequest } from '../../models/request/produto.request';

@Component({
  selector: 'app-formulario',
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent implements OnInit {

  @Input() btnAcao!: string;
  @Input() descTitulo!: string;
  @Input() dadosProduto!: ProdutoResponse | null;
  @Output() onSubmit = new EventEmitter();

  produtoForm!: FormGroup;
  previewUrl: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;

  ngOnInit(): void {
    this.produtoForm = new FormGroup({
      id: new FormControl(this.dadosProduto?.id),
      nome: new FormControl(this.dadosProduto?.nome, [Validators.required]),
      descricao: new FormControl(this.dadosProduto?.descricao, [Validators.required]),
      valor: new FormControl(this.dadosProduto?.valor, [Validators.required, Validators.min(0)]),
      categoria: new FormControl(this.dadosProduto?.categoria, [Validators.required]),
      tamanho: new FormControl(this.dadosProduto?.tamanho, [Validators.required]),
      imagem: new FormControl(this.dadosProduto?.imagem),
      situacao: new FormControl(this.dadosProduto?.situacao || 'Ativo'),
      empresaId: new FormControl(this.dadosProduto?.empresaId || 1)
    });

    // Se houver uma imagem existente, exibe o preview
    if (this.dadosProduto?.imagem) {
      this.previewUrl = this.dadosProduto.imagem;
    }
  }

  submit(): void {
    if(this.produtoForm.valid) {
      const formValue = this.produtoForm.value;
      let valor = formValue.valor;
      if (typeof valor === 'string') {
        valor = valor.replace(',', '.');
        valor = parseFloat(valor);
      }
      // Garante que os campos obrigatórios estejam presentes
      const produtoData = {
        ...formValue,
        valor: valor,
        situacao: formValue.situacao || 'Ativo',
        empresaId: formValue.empresaId || 1,
        id: formValue.id || 0
      };

      if(this.dadosProduto && (this.dadosProduto as ProdutoResponse).id){
        this.onSubmit.emit(produtoData as ProdutoEdicaoRequest);
      }else{
        this.onSubmit.emit(produtoData as ProdutoRequest);
      }
    }else{
      this.produtoForm.markAllAsTouched();
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      // Cria preview da imagem
      const reader = new FileReader();
      reader.onload = (e) => {
        this.previewUrl = e.target?.result as string;
      };
      reader.readAsDataURL(file);

      // Atualiza o valor do form
      this.produtoForm.patchValue({
        imagem: file
      });
    }
  }

  removerImagem(): void {
    this.previewUrl = null;
    this.selectedFile = null;
    this.produtoForm.patchValue({
      imagem: null
    });
    const inputFile = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (inputFile) {
      inputFile.value = '';
    }
  }
}

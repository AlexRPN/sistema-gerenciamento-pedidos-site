import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProdutoResponse } from '../../models/response/produto.response';
import { ProdutoEdicaoRequest } from '../../models/request/produtoEdicao.request';
import { ProdutoRequest } from '../../models/request/produto.request';
import { environment } from '../../../../../environments/environment';

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

    // Se houver uma imagem existente, exibe o preview com a URL completa
    if (this.dadosProduto?.imagem) {
      this.previewUrl = this.getUrlImagem(this.dadosProduto.imagem);
    }
  }

  getUrlImagem(imagem: string | null): string {
    if (!imagem) {
      return 'assets/img/sem-imagem.png';
    }
    return `${environment.UrlApi.replace(/\/api$/, '')}/${imagem}`;
  }

  submit(): void {
    if(this.produtoForm.valid) {
      const formValue = this.produtoForm.value;
      let valor = formValue.valor;
      if (typeof valor === 'string') {
        valor = valor.replace(',', '.');
        valor = parseFloat(valor);
      }

      const formData = new FormData();

      // Adiciona os campos do formulário ao FormData
      formData.append('nome', formValue.nome);
      formData.append('descricao', formValue.descricao);
      formData.append('valor', valor.toString());
      formData.append('categoria', formValue.categoria);
      formData.append('tamanho', formValue.tamanho);
      formData.append('empresaId', (formValue.empresaId || 1).toString());
      formData.append('situacao', formValue.situacao || 'Ativo');

      // Adiciona a imagem se existir
      if (this.selectedFile) {
        formData.append('imagem', this.selectedFile);
      }

      if(this.dadosProduto && (this.dadosProduto as ProdutoResponse).id){
        formData.append('id', formValue.id.toString());
        this.onSubmit.emit(formData as unknown as ProdutoEdicaoRequest);
      } else {
        this.onSubmit.emit(formData as unknown as ProdutoRequest);
      }
    } else {
      this.produtoForm.markAllAsTouched();
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      // Cria preview da imagem e converte para base64
      const reader = new FileReader();
      reader.onload = (e) => {
        this.previewUrl = e.target?.result as string;
        // Atualiza o valor do form com a string base64
        this.produtoForm.patchValue({
          imagem: e.target?.result as string
        });
      };
      reader.readAsDataURL(file);
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

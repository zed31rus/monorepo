using System.Collections.Immutable;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.CodeAnalysis.Diagnostics;

namespace zed31rus.Analyzers.Using;

[DiagnosticAnalyzer(LanguageNames.CSharp)]
public class Using: DiagnosticAnalyzer
{
    internal const string RuleId = "USING0001";
    
    readonly static DiagnosticDescriptor Rule = new(
        RuleId,
        title: "Using directive is not file-scoped usable",
        messageFormat: "'{0}' not allow to use file-scoped alias directive",
        category: "Style",
        DiagnosticSeverity.Error,
        isEnabledByDefault: true
    );
    
    public override void Initialize(AnalysisContext context)
    {
        context.ConfigureGeneratedCodeAnalysis(GeneratedCodeAnalysisFlags.None);
        context.EnableConcurrentExecution();
        context.RegisterSyntaxNodeAction(AnalyzeUsing, SyntaxKind.UsingDirective);
    }

    public override ImmutableArray<DiagnosticDescriptor> SupportedDiagnostics => ImmutableArray.Create(Rule);

    internal static void AnalyzeUsing(SyntaxNodeAnalysisContext context)
    {
        var usingDirective = (UsingDirectiveSyntax)context.Node;

        if (usingDirective.Alias is not null)
        {
            return;
        }
        
        if (usingDirective.StaticKeyword != default) 
        {
            return;
        }

        var diagnostic = Diagnostic.Create(
            Rule,
            usingDirective.UsingKeyword.GetLocation(),
        usingDirective.NamespaceOrType.ToString().Trim());
        
        context.ReportDiagnostic(diagnostic);
    }
}